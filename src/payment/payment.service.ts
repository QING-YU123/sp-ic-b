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
import { UserService } from 'src/user/user.service';
import { TimeTool } from 'src/.tools/time.tool';

/**
 * 缴费单模块服务层
 */
@Injectable()
export class PaymentService {
  /** 
   * 缴费单模块数据层
   */
  static repository: Repository<Payment>;
  constructor(@InjectRepository(Payment) repository: Repository<Payment>) {
    PaymentService.repository = repository;
  }

  /**
   * 缴费单创建业务逻辑处理
   * 
   * @param paymentCreateDto 缴费单创建DTO
   * @returns Result
   */
  async create(paymentCreateDto: PaymentCreateDto) {
    if (!(await PowerService.get(paymentCreateDto)).mPayment) return Result.fail(MsgConst.powerLowE);
    
    paymentCreateDto.body.createdUid = paymentCreateDto.checkingUid;
    const res = await PaymentService.repository.save(paymentCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.payment.create);
  }

  /**
   * 缴费单删除业务逻辑处理
   * 
   * @param paymentDeleteDto 缴费单删除DTO
   * @returns Result
   */
  async delete(paymentDeleteDto: PaymentDeleteDto) {
    if (!(await PowerService.get(paymentDeleteDto)).mPayment) return Result.fail(MsgConst.powerLowE);

    const res = await PaymentService.repository.update(paymentDeleteDto.body.id, { status: 1 });
    
    return Result.isOrNot(res.affected != 0, MsgConst.payment.delete);
  }

  /**
   * 缴费单更新业务逻辑处理
   * 
   * @param paymentUpdateDto 缴费单更新DTO
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
   * 缴费单查询业务逻辑处理
   * 
   * @param paymentQueryDto 缴费单查询DTO
   * @returns Result
   */
  async query(paymentQueryDto: PaymentQueryDto) {
    const power = await PowerService.get(paymentQueryDto);
    if (!power.uMoney) return Result.fail(MsgConst.powerLowE);

    let [data, total] = await PaymentService.repository.findAndCount({
      skip: (paymentQueryDto.body.pageIndex - 1) * paymentQueryDto.body.pageSize,
      take: paymentQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      where: {
        status: In([0, 2]),
        uid: power.mPayment ? null : paymentQueryDto.checkingUid
      }
    });
    const user = await UserService.repository.find({ select: ['id', 'name'], where: { id: In(data.map(item => item.uid)) } });
    let data1: any = data;
    data1.forEach(item => {
      item.name = user.find(userItem => userItem.id == item.uid).name;
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
      if (item.payTime != null) item.payTime = TimeTool.convertToDate(item.payTime);
    });

    return Result.success(MsgConst.payment.query+MsgConst.success, {
      data : data,
      total : total
    });
  }
}
