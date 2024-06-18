import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentCreateDto } from './dtos/payment.create.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { PaymentDeleteDto } from './dtos/payment.delete.dto';
import { PaymentUpdateDto } from './dtos/payment.update.dto';
import { PaymentQueryDto } from './dtos/payment.query.dto';

@Injectable()
export class PaymentService {
  static repository: Repository<Payment>;
  constructor(@InjectRepository(Payment) repository: Repository<Payment>) {
    PaymentService.repository = repository;
  }

  async create(paymentCreateDto: PaymentCreateDto) {
    if (!(await PowerService.get(paymentCreateDto)).mPayment) return Result.fail(MsgConst.powerLowE);
    
    paymentCreateDto.body.createdUid = paymentCreateDto.checkingUid;
    const res = await PaymentService.repository.save(paymentCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.payment.create);
  }

  async delete(paymentDeleteDto: PaymentDeleteDto) {
    if (!(await PowerService.get(paymentDeleteDto)).mPayment) return Result.fail(MsgConst.powerLowE);

    const res = await PaymentService.repository.update(paymentDeleteDto.body.id, { status: 1 });
    
    return Result.isOrNot(res.affected != 0, MsgConst.payment.delete);
  }

  async update(paymentUpdateDto: PaymentUpdateDto) {
    if (!(await PowerService.get(paymentUpdateDto)).mPayment) return Result.fail(MsgConst.powerLowE);

    const res = await PaymentService.repository.update(paymentUpdateDto.body.id, { status: 2, payTime: () => "Now()" });

    return Result.isOrNot(res.affected != 0, MsgConst.payment.update);
  }

  async query(paymentQueryDto: PaymentQueryDto) {
    if (!(await PowerService.get(paymentQueryDto)).uMoney) return Result.fail(MsgConst.powerLowE);

    const [data, total] = await PaymentService.repository.findAndCount({
      skip: (paymentQueryDto.body.pageIndex - 1) * paymentQueryDto.body.pageSize,
      take: paymentQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      where: {
        status: In([0,  2]),
      }
    })

    return Result.success(MsgConst.payment.query+MsgConst.success, {
      data : data,
      total : total
    });
  }
}
