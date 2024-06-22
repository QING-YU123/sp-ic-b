import { Body, Controller, Post } from '@nestjs/common';
import { MsgConst } from 'src/.const/msg.const';
import { NumConst } from 'src/.const/num.const';
import { Result } from 'src/.dtos/result';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { StringTool } from 'src/.tools/string.tool';
import { AttendService } from './attend.service';
import { AttendCreateDto } from './dtos/attend.create.dto';
import { AttendQueryDto } from './dtos/attend.query.dto';
import { AttendUpdateDto } from './dtos/attend.update.dto';

/**
 * 活动参与记录模块控制层
 */
@Controller('attend')
export class AttendController {
  constructor(private readonly attendService: AttendService) { }
  
  /**
   * 创建活动参与记录
   * 
   * @param attendCreateDto 活动参与记录创建DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() attendCreateDto: AttendCreateDto) {
    if (!NumberTool.isInteger(attendCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(attendCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(attendCreateDto.body.aid)) return Result.fail(MsgConst.idNotExistE);

    return await this.attendService.create(attendCreateDto);
  }

  /**
   * 活动举办人修改活动参与证明
   * 
   * @param attendUpdateDto 活动参与记录更新DTO
   * @returns Result
   */
  @Post('update')
  async update(@Body() attendUpdateDto: AttendUpdateDto) { 
    if (!NumberTool.isInteger(attendUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(attendUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(attendUpdateDto.body.id)) return Result.fail(MsgConst.uidNotExistE);
    if (!StringTool.isLengthInRange(attendUpdateDto.body.result, 0, NumConst.imageMax))
      return Result.fail(MsgConst.imageSizeE);

    return await this.attendService.update(attendUpdateDto);
  }

  /**
   * 查询活动参与记录
   * 用户仅可查询自己的活动参与记录
   * 普通管理员可查询所有活动参与记录
   * 举办活动人可查询自己举办的活动的参与记录
   * 
   * @param attendQueryDto 活动参与记录查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() attendQueryDto: AttendQueryDto) { 
    if (!NumberTool.isInteger(attendQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(attendQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(attendQueryDto.body.pageIndex, 0, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);
    if (!NumberTool.isIntegerInRange(attendQueryDto.body.pageSize, 0, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    
    return await this.attendService.query(attendQueryDto);
  }
}
