import { Body, Controller, Post } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillDeleteDto } from './dtos/bill.delete.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { BillUpdateDto } from './dtos/bill.update.dto';
import { StringTool } from 'src/.tools/string.tool';
import { BillQueryDto } from './dtos/bill.query.dto';
import { NumConst } from 'src/.const/num.const';
import { BooleanTool } from 'src/.tools/boolean.tool';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) { }
  
  @Post('delete')
  async delete(@Body() billDeleteDto: BillDeleteDto) { 
    if (!NumberTool.isInteger(billDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(billDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(billDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.billService.delete(billDeleteDto);
  }

  @Post('update')
  async update(@Body() billUpdateDto: BillUpdateDto) { 
    if (!NumberTool.isInteger(billUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(billUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(billUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(billUpdateDto.body.payPassword, 6, 6)) return Result.fail(MsgConst.payPasswordLengthE);

    return await this.billService.update(billUpdateDto);
  }

  @Post('query')
  async query(@Body() billQueryDto: BillQueryDto) { 
    if (!NumberTool.isInteger(billQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(billQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(billQueryDto.body.pageSize, 1, 100)) return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(billQueryDto.body.pageIndex, 1, NumConst.intMax)) return Result.fail(MsgConst.pageIndexE);
    if (!BooleanTool.isBoolean(billQueryDto.body.paid)) return Result.fail(MsgConst.booleanE);

    return await this.billService.query(billQueryDto);
  }
}
