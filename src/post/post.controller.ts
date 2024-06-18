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

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }
  
  @Post('create')
  async create(@Body() postCreateDto: PostCreateDto) { 
    if (!NumberTool.isInteger(postCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(postCreateDto.body.tag, 1, 30)) return Result.fail(MsgConst.tagLengthE);
    if (!StringTool.isLengthInRange(postCreateDto.body.title, 1, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(postCreateDto.body.coverImg, 1, NumConst.imageMax))
      return Result.fail(MsgConst.imageSizeE);
    if (!StringTool.isLengthInRange(postCreateDto.body.content, 1, NumConst.imageMax)) return Result.fail(MsgConst.contentLengthE);

    return await this.postService.create(postCreateDto);
  }

  @Post('delete')
  async delete(@Body() postDeleteDto: PostDeleteDto) { 
    if (!NumberTool.isInteger(postDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.postService.delete(postDeleteDto);
  }

  @Post('update')
  async update(@Body() postDeleteDto: PostUpdateDto) { 
    if (!NumberTool.isInteger(postDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(postDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!BooleanTool.isBoolean(postDeleteDto.body.approved)) return Result.fail(MsgConst.booleanE);

    return await this.postService.update(postDeleteDto);
  }

  @Post('query')
  async query(@Body() postQueryDto: PostQueryDto) { 
    if (!NumberTool.isInteger(postQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(postQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(postQueryDto.body.pageSize, 1, 100)) return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(postQueryDto.body.pageIndex, 1, 10000)) return Result.fail(MsgConst.pageIndexE);
    if (!BooleanTool.isBoolean(postQueryDto.body.approved)) return Result.fail(MsgConst.booleanE);

    return await this.postService.query(postQueryDto);
  }
}
