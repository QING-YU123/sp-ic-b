import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './dtos/post.create.dto';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { NumberTool } from 'src/.tools/number.tool';
import { StringTool } from 'src/.tools/string.tool';
import { PostDeleteDto } from './dtos/post.delete.dto';
import { PostUpdateDto } from './dtos/post.update.dto';
import { PostQueryDto } from './dtos/post.query.dto';
import { BooleanTool } from 'src/.tools/boolean.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { NumConst } from 'src/.const/num.const';
import { PostGetCoverImgDto } from './dtos/post.get_cover_img.dto';
import { PostGetContentDto } from './dtos/post.get_content.dto';

/**
 * 帖子模块控制层
 */
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }
  
  /**
   * 创建帖子
   * 仅未被禁言的用户可创建帖子
   * 没有审核帖子权限的用户发布的帖子需等待管理员审核通过
   * 
   * @param postCreateDto 帖子创建DTO
   * @returns 
   */
  @Post('create')
  async create(@Body() postCreateDto: PostCreateDto) { 
    if (!NumberTool.isInteger(postCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(postCreateDto.body.tag, 1, 30)) return Result.fail(MsgConst.tagLengthE);
    if (!StringTool.isLengthInRange(postCreateDto.body.title, 1, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(postCreateDto.body.coverImg, 1, NumConst.imageMax))
      return Result.fail(MsgConst.imageSizeE);
    if (!StringTool.isLengthInRange(postCreateDto.body.content, 1, NumConst.imageMax))
      return Result.fail(MsgConst.contentLengthE);

    return await this.postService.create(postCreateDto);
  }

  /**
   * 删除帖子
   * 用户可以删除自己的帖子，将状态置为2
   * 帖子管理人员可以删除任意帖子，将状态置为1
   * 
   * @param postDeleteDto 帖子删除DTO
   * @returns 
   */
  @Post('delete')
  async delete(@Body() postDeleteDto: PostDeleteDto) { 
    if (!NumberTool.isInteger(postDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.postService.delete(postDeleteDto);
  }

  /**
   * 审核帖子
   * 仅帖子管理人员可审核需要审核的帖子
   * 
   * @param postDeleteDto 帖子审核DTO
   * @returns 
   */
  @Post('update')
  async update(@Body() postDeleteDto: PostUpdateDto) { 
    if (!NumberTool.isInteger(postDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!BooleanTool.isBoolean(postDeleteDto.body.approved)) return Result.fail(MsgConst.booleanE);

    return await this.postService.update(postDeleteDto);
  }

  /**
   * 查询帖子
   * approved = true 代表已审核通过的帖子
   * approved = false 代表待审核的帖子
   * 仅帖子审核人员可查看待审核帖子
   * 
   * @param postQueryDto 帖子查询DTO
   * @returns 
   */
  @Post('query')
  async query(@Body() postQueryDto: PostQueryDto) { 
    if (!NumberTool.isInteger(postQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(postQueryDto.body.pageSize, 1, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(postQueryDto.body.pageIndex, 1, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);
    if (!BooleanTool.isBoolean(postQueryDto.body.approved)) return Result.fail(MsgConst.booleanE);
    //if (!StringTool.isLengthInRange(postQueryDto.body.search, 0, 30)) return Result.fail(MsgConst.searchLengthE);

    return await this.postService.query(postQueryDto);
  }

  /**
   * 获取帖子封面图片
   * 
   * @param postGetCoverImgDto 帖子封面图片查询DTO
   * @returns 
   */
  @Post('get-cover-img')
  async getCoverImg(@Body() postGetCoverImgDto: PostGetCoverImgDto) { 
    if (!NumberTool.isInteger(postGetCoverImgDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postGetCoverImgDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postGetCoverImgDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.postService.getCoverImg(postGetCoverImgDto);
  }

  /**
   * 获取帖子内容
   * 
   * @param postGetContentDto 帖子内容查询DTO
   * @returns 
   */
  @Post('get-content')
  async getContent(@Body() postGetContentDto: PostGetContentDto) { 
    if (!NumberTool.isInteger(postGetContentDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postGetContentDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postGetContentDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.postService.getContent(postGetContentDto);
  }
}
