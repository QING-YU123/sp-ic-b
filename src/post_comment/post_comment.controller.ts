import { Body, Controller, Post } from '@nestjs/common';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { StringTool } from 'src/.tools/string.tool';
import { PostCommentCreateDto } from './dtos/post_comment.create.dto';
import { PostCommentDeleteDto } from './dtos/post_comment.delete.dto';
import { PostCommentQueryDto } from './dtos/post_comment.query.dto';
import { PostCommentService } from './post_comment.service';
import { NumConst } from 'src/.const/num.const';

/**
 * 帖子评论模块控制层
 */
@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) { }
  
  /**
   * 创建帖子评论
   * 仅非禁言用户可创建评论
   * 
   * @param postCommentCreateDto 帖子评论创建DTO
   * @returns 
   */
  @Post('create')
  async create(@Body() postCommentCreateDto: PostCommentCreateDto) { 
    if (!NumberTool.isInteger(postCommentCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCommentCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(postCommentCreateDto.body.comment, 1, 255)) return Result.fail(MsgConst.commentLengthE);
    if (postCommentCreateDto.body.replyUid != null) {
      if(!NumberTool.isInteger(postCommentCreateDto.body.replyUid)) return Result.fail(MsgConst.idNotExistE);
    }

    return await this.postCommentService.create(postCommentCreateDto);
  }

  /**
   * 删除帖子评论
   * 用户自己可删除自己发的评论，将状态置为2
   * 管理员可删除所有评论，将状态置为1
   * 
   * @param postCommentDeleteDto 帖子评论删除DTO
   * @returns Result
   */
  @Post('delete')
  async delete(@Body() postCommentDeleteDto: PostCommentDeleteDto) {
    if (!NumberTool.isInteger(postCommentDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCommentDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postCommentDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.postCommentService.delete(postCommentDeleteDto);
  }

  /**
   * 查询帖子评论
   * 仅可查看某条帖子下的未被删除的评论
   * 
   * @param postCommentQueryDto 帖子评论查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() postCommentQueryDto: PostCommentQueryDto) {
    if (!NumberTool.isInteger(postCommentQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCommentQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postCommentQueryDto.body.pid)) return Result.fail(MsgConst.idNotExistE);
    if (!NumberTool.isIntegerInRange(postCommentQueryDto.body.pageSize, 1, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(postCommentQueryDto.body.pageIndex, 1, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);

    return await this.postCommentService.query(postCommentQueryDto);
  }
}
