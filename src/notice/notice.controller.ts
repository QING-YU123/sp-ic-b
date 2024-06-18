import { Body, Controller, Post } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { StringTool } from 'src/.tools/string.tool';
import { NoticeCreateDto } from './dtos/notice.create.dto';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { NoticeDeleteDto } from './dtos/notice.delete.dto';
import { NoticeUpdateDto } from './dtos/notice.update.dto';
import { NoticeQueryDto } from './dtos/notice.query.dto';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) { }
  
  @Post('create')
  async create(@Body() noticeCreateDto: NoticeCreateDto) {
    if (!NumberTool.isInteger(noticeCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(noticeCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(noticeCreateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(noticeCreateDto.body.content, 0, 2000)) return Result.fail(MsgConst.contentLengthE);
    if (!NumberTool.isInteger(noticeCreateDto.body.type)) return Result.fail(MsgConst.typeE);

    return this.noticeService.create(noticeCreateDto);
  }

  @Post('delete')
  async delete(@Body() noticeDeleteDto: NoticeDeleteDto) { 
    if (!NumberTool.isInteger(noticeDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(noticeDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(noticeDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return this.noticeService.delete(noticeDeleteDto);
  }

  @Post('update')
  async update(@Body() noticeUpdateDto: NoticeUpdateDto) { 
    if (!NumberTool.isInteger(noticeUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(noticeUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(noticeUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(noticeUpdateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(noticeUpdateDto.body.content, 0, 2000)) return Result.fail(MsgConst.contentLengthE);
    if (!NumberTool.isInteger(noticeUpdateDto.body.status)) return Result.fail(MsgConst.statusE);

    return this.noticeService.update(noticeUpdateDto);
  }

  @Post('query')
  async query(@Body() noticeQueryDto: NoticeQueryDto) { 
    if (!NumberTool.isInteger(noticeQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(noticeQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(noticeQueryDto.body.pageSize, 1, 100)) return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isInteger(noticeQueryDto.body.pageIndex)) return Result.fail(MsgConst.pageIndexE);

    return this.noticeService.query(noticeQueryDto);
  }
}
