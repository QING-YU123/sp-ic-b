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
import { BillService } from 'src/bill/bill.service';

@Injectable()
export class PaymentService {
  static repository: Repository<Payment>;
  constructor(@InjectRepository(Payment) repository: Repository<Payment>) {
    PaymentService.repository = repository;
  }

  /**
   * 缴费记录创建业务逻辑处理
   * 
   * @param paymentCreateDto 缴费记录创建数据传输对象
   * @returns Result
   */
  async create(paymentCreateDto: PaymentCreateDto) {
    if (!(await PowerService.get(paymentCreateDto)).mPayment) return Result.fail(MsgConst.powerLowE);
    
    paymentCreateDto.body.createdUid = paymentCreateDto.checkingUid;
    const res = await PaymentService.repository.save(paymentCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.payment.create);
  }

  /**
   * 缴费记录删除业务逻辑处理
   * 
   * @param paymentDeleteDto 缴费记录删除数据传输对象
   * @returns Result
   */
  async delete(paymentDeleteDto: PaymentDeleteDto) {
    if (!(await PowerService.get(paymentDeleteDto)).mPayment) return Result.fail(MsgConst.powerLowE);

    const res = await PaymentService.repository.update(paymentDeleteDto.body.id, { status: 1 });
    
    return Result.isOrNot(res.affected != 0, MsgConst.payment.delete);
  }

  /**
   * 缴费记录更新业务逻辑处理
   * 
   * @param paymentUpdateDto 缴费记录更新数据传输对象
   * @returns Result
   */
  async update(paymentUpdateDto: PaymentUpdateDto) {
    if (!(await PowerService.get(paymentUpdateDto)).uMoney) return Result.fail(MsgConst.powerLowE);
    const payment = await PaymentService.repository.findOne({ where: { id: paymentUpdateDto.body.id } });
    if (payment.bid != null) return Result.fail(MsgConst.billHadExistE);

    const bill = await BillService.repository.save({
      pmid: payment.id,
      title: payment.title,
      content: payment.content,
      price: payment.price
    });
    PaymentService.repository.update(paymentUpdateDto.body.id, { bid: bill.id });

    return Result.success(MsgConst.billCreate, bill.id);
  }
  
  /**
   * 缴费记录查询业务逻辑处理
   * 
   * @param paymentQueryDto 缴费记录查询数据传输对象
   * @returns Result
   */
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
