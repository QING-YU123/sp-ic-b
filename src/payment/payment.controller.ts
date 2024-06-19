import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentCreateDto } from './dtos/payment.create.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { StringTool } from 'src/.tools/string.tool';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { PaymentDeleteDto } from './dtos/payment.delete.dto';
import { PaymentUpdateDto } from './dtos/payment.update.dto';
import { PaymentQueryDto } from './dtos/payment.query.dto';
import { NumConst } from 'src/.const/num.const';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }
  
  @Post('create')
  async create(@Body() paymentCreateDto: PaymentCreateDto) {
    if (!NumberTool.isInteger(paymentCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(paymentCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(paymentCreateDto.body.uid)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(paymentCreateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(paymentCreateDto.body.content, 0, 255)) return Result.fail(MsgConst.contentLengthE);
    if (!NumberTool.isIntegerInRange(paymentCreateDto.body.price, 0, NumConst.intMax)) return Result.fail(MsgConst.typeE);

    return this.paymentService.create(paymentCreateDto);
  }

  @Post('delete')
  async delete(@Body() paymentDeleteDto: PaymentDeleteDto) {
    if (!NumberTool.isInteger(paymentDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(paymentDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(paymentDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return this.paymentService.delete(paymentDeleteDto);
  }
  
  @Post('update')
  async update(@Body() paymentUpdateDto: PaymentUpdateDto) { 
    if (!NumberTool.isInteger(paymentUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(paymentUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(paymentUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return this.paymentService.update(paymentUpdateDto);
  }

  @Post('query')
  async query(@Body() paymentQueryDto: PaymentQueryDto) { 
    if (!NumberTool.isInteger(paymentQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(paymentQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(paymentQueryDto.body.pageIndex)) return Result.fail(MsgConst.pageIndexE);
    if (!NumberTool.isIntegerInRange(paymentQueryDto.body.pageSize, 1, 100)) return Result.fail(MsgConst.pageSizeE);

    return this.paymentService.query(paymentQueryDto);
  }
}
