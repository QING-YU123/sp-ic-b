import { Body, Controller, Post } from '@nestjs/common';
import { PostLikeService } from './post_like.service';
import { PostLikeCreateDto } from './dtos/post_like.create.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { ObjectTool } from 'src/.tools/object.tool';
import { PostLikeDeleteDto } from './dtos/post_like.delete.dto';
import { PostLikeQueryDto } from './dtos/post_like.query.dto';

/**
 * 帖子点赞模块控制层
 */
@Controller('post-like')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) { }
  
  /**
   * 创建帖子点赞
   * 
   * @param postLikeCreateDto 帖子点赞创建DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() postLikeCreateDto: PostLikeCreateDto) { 
    if (!NumberTool.isInteger(postLikeCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postLikeCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postLikeCreateDto.body.pid)) return Result.fail(MsgConst.idNotExistE);

    return await this.postLikeService.create(postLikeCreateDto);
  }

  /**
   * 删除帖子点赞
   * 
   * @param postLikeDeleteDto 贴子点赞删除DTO
   * @returns Result
   */
  @Post('delete')
  async delete(@Body() postLikeDeleteDto: PostLikeDeleteDto) {
    if (!NumberTool.isInteger(postLikeDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postLikeDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postLikeDeleteDto.body.pid)) return Result.fail(MsgConst.idNotExistE);

    return await this.postLikeService.delete(postLikeDeleteDto);
  }

  /**
   * 查询帖子点赞
   * 
   * @param postLikeQueryDto 贴子点赞查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() postLikeQueryDto: PostLikeQueryDto) {
    if (!NumberTool.isInteger(postLikeQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postLikeQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postLikeQueryDto.body.pid)) return Result.fail(MsgConst.idNotExistE);

    return await this.postLikeService.query(postLikeQueryDto);
  }
}
