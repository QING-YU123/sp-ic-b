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

@Controller('repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) { }
  
  @Post('create')
  async create(@Body() repairCreateDto: RepairCreateDto) {
    if (!NumberTool.isInteger(repairCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!StringTool.isLengthInRange(repairCreateDto.body.title, 0, 20)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(repairCreateDto.body.content, 0, 255)) return Result.fail(MsgConst.contentLengthE);
    if (!StringTool.isLengthInRange(repairCreateDto.body.address, 0, 50)) return Result.fail(MsgConst.addressLengthE);

    return await this.repairService.create(repairCreateDto);
  }

  @Post('delete')
  async delete(@Body() repairDeleteDto: RepairDeleteDto) {
    if (!NumberTool.isInteger(repairDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!NumberTool.isInteger(repairDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.repairService.delete(repairDeleteDto);
  }

  @Post('update')
  async update(@Body() repairUpdateDto: RepairUpdateDto) { 
    if (!NumberTool.isInteger(repairUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!NumberTool.isInteger(repairUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!NumberTool.isIntegerInRange(repairUpdateDto.body.status,2,3)) return Result.fail(MsgConst.statusE);

    return await this.repairService.update(repairUpdateDto);
  }

  @Post('query')
  async query(@Body() repairQueryDto: RepairQueryDto) { 
    if (!NumberTool.isInteger(repairQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!NumberTool.isIntegerInRange(repairQueryDto.body.pageSize, 1, 100)) return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isInteger(repairQueryDto.body.pageIndex)) return Result.fail(MsgConst.pageIndexE);

    return await this.repairService.query(repairQueryDto);
  }
}
