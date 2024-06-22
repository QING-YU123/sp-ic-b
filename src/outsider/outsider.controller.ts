import { Body, Controller, Get, Post } from '@nestjs/common';
import { Result } from './../.dtos/result';
import { NumberTool } from './../.tools/number.tool';
import { StringTool } from './../.tools/string.tool';
import { OutsiderCreateDto } from './dtos/outsider.create.dto';
import { OutsiderService } from './outsider.service';
import { OutsiderDeleteDto } from './dtos/outsider.delete.dto';
import { OutsiderUpdateDto } from './dtos/outsider.update.dto';
import { OutsiderQueryDto } from './dtos/outsider.query.dto';
import { PasswordTool } from './../.tools/password.tool';
import { MsgConst } from 'src/.const/msg.const';
import { VarConst } from 'src/.const/var.const';
import { ObjectTool } from 'src/.tools/object.tool';
import { NumConst } from 'src/.const/num.const';

/**
 * 外来人员模块控制层
 */
@Controller('outsider')
export class OutsiderController {
  constructor(private readonly outsiderService: OutsiderService) { }
  
  /**
   * 登记外来人员
   * 仅外来人员管理人员可访问
   * 
   * @param outsiderCreateDto 外来人员登记DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() outsiderCreateDto: OutsiderCreateDto) { 
    if (!NumberTool.isInteger(outsiderCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(outsiderCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.gender, 1, 1)) return Result.fail(MsgConst.genderLengthE);
    if (!VarConst.genders.includes(outsiderCreateDto.body.gender)) return Result.fail(MsgConst.genderE);
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.name, 1, 10)) return Result.fail(MsgConst.nameLengthE);
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.address, 1, 255)) return Result.fail(MsgConst.addressLengthE);

    return await this.outsiderService.create(outsiderCreateDto);
  }

  /**
   * 注销外来人员
   * 仅外来人员管理人员可访问
   * 
   * @param outsiderDeleteDto 外来人员注销DTO
   * @returns Result
   */
  @Post('delete')
  async delete(@Body() outsiderDeleteDto: OutsiderDeleteDto) {
    if (!NumberTool.isInteger(outsiderDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(outsiderDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(outsiderDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.outsiderService.delete(outsiderDeleteDto);
  }

  /**
   * 更新外来人员信息
   * 仅外来人员管理人员可访问
   *  
   * @param outsiderUpdateDto 外来人员更新DTO
   * @returns Result
   */
  @Post('update')
  async update(@Body() outsiderUpdateDto: OutsiderUpdateDto) { 
    if (!NumberTool.isInteger(outsiderUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(outsiderUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(outsiderUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(outsiderUpdateDto.body.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!StringTool.isLengthInRange(outsiderUpdateDto.body.gender, 1, 1)) return Result.fail(MsgConst.genderLengthE);
    if (!VarConst.genders.includes(outsiderUpdateDto.body.gender)) return Result.fail(MsgConst.genderE);
    if (!StringTool.isLengthInRange(outsiderUpdateDto.body.name, 1, 10)) return Result.fail(MsgConst.nameLengthE);
    if (!StringTool.isLengthInRange(outsiderUpdateDto.body.address, 1, 255)) return Result.fail(MsgConst.addressLengthE);

    return await this.outsiderService.update(outsiderUpdateDto);
  }

  /**
   * 查询外来人员信息
   * 仅外来人员管理人员可访问
   * 
   * @param outsiderQueryDto 外来人员查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() outsiderQueryDto: OutsiderQueryDto) { 
    if (!NumberTool.isInteger(outsiderQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(outsiderQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(outsiderQueryDto.body.pageSize, 1, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(outsiderQueryDto.body.pageIndex, 1, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);

    return await this.outsiderService.query(outsiderQueryDto);
  }
}
