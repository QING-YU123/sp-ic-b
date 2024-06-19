import { Body, Controller, Get, Post } from '@nestjs/common';
import { AttendService } from './attend.service';
import { NumberTool } from 'src/.tools/number.tool';
import { AttendCreateDto } from './dtos/attend.create.dto';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { ObjectTool } from 'src/.tools/object.tool';
import { AttendUpdateDto } from './dtos/attend.update.dto';
import { StringTool } from 'src/.tools/string.tool';
import { NumConst } from 'src/.const/num.const';
import { AttendQueryDto } from './dtos/attend.query.dto';

@Controller('attend')
export class AttendController {
  constructor(private readonly attendService: AttendService) { }

  @Post('create2')
  async get(@Body() attendCreateDto: AttendCreateDto) {
    console.log(attendCreateDto)
    return attendCreateDto.checkingUid;
  }
  
  @Post('create')
  async create(@Body() attendCreateDto: AttendCreateDto) {
    console.log(attendCreateDto)
    if (!NumberTool.isInteger(attendCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(attendCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(attendCreateDto.body.uid)) return Result.fail(MsgConst.uidNotExistE);
    if (!NumberTool.isInteger(attendCreateDto.body.aid)) return Result.fail(MsgConst.aidNotExistE);

    return await this.attendService.create(attendCreateDto);
  }

  @Post('update')
  async update(@Body() attendUpdateDto: AttendUpdateDto) { 
    if (!NumberTool.isInteger(attendUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(attendUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(attendUpdateDto.body.id)) return Result.fail(MsgConst.uidNotExistE);
    if (!StringTool.isLengthInRange(attendUpdateDto.body.result, 0, NumConst.imageMax)) return Result.fail(MsgConst.imageSizeE);

    return await this.attendService.update(attendUpdateDto);
  }

  @Post('query')
  async query(@Body() attendQueryDto: AttendQueryDto) { 
    if (!NumberTool.isInteger(attendQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(attendQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(attendQueryDto.body.pageIndex)) return Result.fail(MsgConst.pageIndexE);
    if (!NumberTool.isIntegerInRange(attendQueryDto.body.pageSize, 0 ,100)) return Result.fail(MsgConst.pageSizeE);
    
    return await this.attendService.query(attendQueryDto);
  }
}
