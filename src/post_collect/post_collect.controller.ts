import { Body, Controller, Post } from '@nestjs/common';
import { PostCollectService } from './post_collect.service';
import { PostCollectCreateDto } from './dtos/post_collect.create.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { PostCollectDeleteDto } from './dtos/post_collect.delete.dto';
import { PostCollectQueryListDto } from './dtos/post_collect.query_list.dto';
import { NumConst } from 'src/.const/num.const';

/**
 * 帖子收藏模块控制层
 */
@Controller('post-collect')
export class PostCollectController {
  constructor(private readonly postCollectService: PostCollectService) { }
  
  /**
   * 创建帖子收藏记录
   * 
   * @param postCollectCreateDto 帖子收藏记录创建DTO
   * @returns Result 
   */
  @Post('create')
  async create(@Body() postCollectCreateDto: PostCollectCreateDto) { 
    if (!NumberTool.isInteger(postCollectCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCollectCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postCollectCreateDto.body.pid)) return Result.fail(MsgConst.idNotExistE);

    return await this.postCollectService.create(postCollectCreateDto);
  }

  /**
   * 删除帖子收藏记录
   * 
   * @param postCollectDeleteDto 贴子收藏记录删除DTO
   * @returns Result 
   */
  @Post('delete')
  async delete(@Body() postCollectDeleteDto: PostCollectDeleteDto) {
    if (!NumberTool.isInteger(postCollectDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCollectDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postCollectDeleteDto.body.pid)) return Result.fail(MsgConst.idNotExistE);

    return await this.postCollectService.delete(postCollectDeleteDto);
  }

  /**
   * 查询帖子收藏记录
   * 
   * @param postCollectQueryDto 贴子收藏记录查询DTO
   * @returns Result 
   */
  @Post('query')
  async query(@Body() postCollectQueryDto: PostCollectDeleteDto) {
    if (!NumberTool.isInteger(postCollectQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCollectQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postCollectQueryDto.body.pid)) return Result.fail(MsgConst.idNotExistE);

    return await this.postCollectService.query(postCollectQueryDto);
  }

  /**
   * 查询帖子收藏记录列表
   * 
   * @param postCollectQueryListDto 贴子收藏记录列表查询DTO
   * @returns Result 
   */
  @Post('query-list')
  async queryList(@Body() postCollectQueryListDto: PostCollectQueryListDto) { 
    if (!NumberTool.isInteger(postCollectQueryListDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCollectQueryListDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(postCollectQueryListDto.body.pageSize, 1, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(postCollectQueryListDto.body.pageIndex, 1, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);

    return await this.postCollectService.queryList(postCollectQueryListDto);
  }
}
