import { Body, Controller, Post } from '@nestjs/common';
import { PostCommentLikeService } from './post_comment_like.service';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { PostCommentLikeCreateDto } from './dtos/post_comment_like.create.dto';
import { PostCommentLikeDeleteDto } from './dtos/post_comment_like.delete';
import { PostCommentLikeQueryDto } from './dtos/post_comment_like.query';

@Controller('post-comment-like')
export class PostCommentLikeController {
  constructor(private readonly postCommentLikeService: PostCommentLikeService) { }
  
  @Post('create')
  async create(@Body() postCommentLikeCreateDto: PostCommentLikeCreateDto) { 
    if (!NumberTool.isInteger(postCommentLikeCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCommentLikeCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postCommentLikeCreateDto.body.pcid)) return Result.fail(MsgConst.idNotExistE);

    return await this.postCommentLikeService.create(postCommentLikeCreateDto);
  }

  @Post('delete')
  async delete(@Body() postCommentLikeDeleteDto: PostCommentLikeDeleteDto) {
    if (!NumberTool.isInteger(postCommentLikeDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCommentLikeDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postCommentLikeDeleteDto.body.pcid)) return Result.fail(MsgConst.idNotExistE);

    return await this.postCommentLikeService.delete(postCommentLikeDeleteDto);
  }

  @Post('query')
  async query(@Body() postCommentLikeQueryDto: PostCommentLikeQueryDto) {
    if (!NumberTool.isInteger(postCommentLikeQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCommentLikeQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postCommentLikeQueryDto.body.pcid)) return Result.fail(MsgConst.idNotExistE);

    return await this.postCommentLikeService.query(postCommentLikeQueryDto);
  }
}
