import { Body, Controller, Post } from '@nestjs/common';
import { RepairService } from './repair.service';
import { RepairCreateDto } from './dtos/repair.create.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { StringTool } from 'src/.tools/string.tool';
import { Result } from 'src/.dtos/result';
import { RepairDeleteDto } from './dtos/repair.delete.dto';
import { RepairUpdateDto } from './dtos/repair.update.dto';
import { RepairQueryDto } from './dtos/repair.query.dto';
import { MsgConst } from 'src/.const/msg.const';
import { ObjectTool } from 'src/.tools/object.tool';
import { NumConst } from 'src/.const/num.const';

/**
 * 维修申报模块控制层
 */
@Controller('repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) { }
  
  /**
   * 创建维修申报
   * 仅允许拥有使用维修申报权限用户使用
   * 
   * @param repairCreateDto 维修申报创建DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() repairCreateDto: RepairCreateDto) {
    if (!NumberTool.isInteger(repairCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(repairCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(repairCreateDto.body.title, 0, 20)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(repairCreateDto.body.content, 0, 255)) return Result.fail(MsgConst.contentLengthE);
    if (!StringTool.isLengthInRange(repairCreateDto.body.address, 0, 50)) return Result.fail(MsgConst.addressLengthE);

    return await this.repairService.create(repairCreateDto);
  }

  /**
   * 删除维修申报
   * 仅允许维修申报管理人员使用
   * 
   * @param repairDeleteDto 维修申报删除DTO
   * @returns Result
   */
  @Post('delete')
  async delete(@Body() repairDeleteDto: RepairDeleteDto) {
    if (!NumberTool.isInteger(repairDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(repairDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(repairDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.repairService.delete(repairDeleteDto);
  }

  /**
   * 更新维修申报
   * 仅允许维修申报管理人员设置记录状态
   * 
   * @param repairUpdateDto 维修申报更新DTO
   * @returns Result
   */
  @Post('update')
  async update(@Body() repairUpdateDto: RepairUpdateDto) { 
    if (!NumberTool.isInteger(repairUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(repairUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(repairUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!NumberTool.isIntegerInRange(repairUpdateDto.body.status,2,3)) return Result.fail(MsgConst.statusE);

    return await this.repairService.update(repairUpdateDto);
  }

  /**
   * 查询维修申报
   * 普通用户仅能查询自己提交的维修申报，管理人员可以查询所有维修申报
   * 
   * @param repairQueryDto 维修申报查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() repairQueryDto: RepairQueryDto) { 
    if (!NumberTool.isInteger(repairQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(repairQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(repairQueryDto.body.pageSize, 1, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(repairQueryDto.body.pageIndex, 1, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);

    return await this.repairService.query(repairQueryDto);
  }
}
