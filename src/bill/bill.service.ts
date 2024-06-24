import { Injectable, Res } from '@nestjs/common';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BillDeleteDto } from './dtos/bill.delete.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { BillUpdateDto } from './dtos/bill.update.dto';
import { UserService } from 'src/user/user.service';
import { PasswordTool } from 'src/.tools/password.tool';
import { BillQueryDto } from './dtos/bill.query.dto';
import { PaymentService } from 'src/payment/payment.service';
import { TimeTool } from 'src/.tools/time.tool';

/**
 * 账单模块服务层
 */
@Injectable()
export class BillService {
  /**
   * 账单模块数据层
   */
  static repository: Repository<Bill>;
  constructor(@InjectRepository(Bill) repository: Repository<Bill>) { 
    BillService.repository = repository;
  }
  
  /**
   * 账单删除业务逻辑处理
   * 
   * @param billCreateDto 账单删除DTO
   * @returns Result
   */
  async delete(billDeleteDto: BillDeleteDto) {
    const bill = await BillService.repository.findOne({ select: ['uid', 'status'], where: { id: billDeleteDto.body.id } });
    if (bill.uid != billDeleteDto.checkingUid) {
      if (!(await PowerService.get(billDeleteDto)).mUser) return Result.fail(MsgConst.powerLowE);
    }
    if (bill.status == 0) return Result.fail(MsgConst.hadNotPayE);

    const res = await BillService.repository.update(billDeleteDto.body.id, {
      status: bill.uid == billDeleteDto.checkingUid ? 3 : 1,
    });

    return Result.isOrNot(res.affected != 0, MsgConst.bill.delete);
  }
  
  /**
   * 账单支付业务逻辑处理
   * 
   * @param billUpdateDto 账单支付DTO
   * @returns Result
   */
  async update(billUpdateDto: BillUpdateDto) {
    if (!(await PowerService.get(billUpdateDto)).uMoney) return Result.fail(MsgConst.powerLowE);
    const bill = await BillService.repository.findOne({
      select: ['uid', 'price', 'status', 'pmid'],
      where: { id: billUpdateDto.body.id }
    });
    if (bill == null) return Result.fail(MsgConst.idNotExistE);
    if (bill.status != 0) return Result.fail(MsgConst.hadPayE);
    if (bill.uid != billUpdateDto.checkingUid) return Result.fail(MsgConst.notSelfPayE);
    const user = await UserService.repository.findOne({
      select: ['money', 'id'],
      where: { id: billUpdateDto.checkingUid }
    });
    if (user.money == null) return Result.fail(MsgConst.notOpenMoney);
    if (user.money < bill.price) return Result.fail(MsgConst.notEnoughMoneyE);
    if ((await UserService.repository.countBy({
      id: billUpdateDto.checkingUid,
      payPassword: PasswordTool.encrypt(billUpdateDto.body.payPassword)
    })) != 1) return Result.fail(MsgConst.payPasswordE);

    const res1 = await UserService.repository.update(billUpdateDto.checkingUid, {
      money: ()=> "user.money - " +bill.price
    });
    if (res1.affected != 1) return Result.fail(MsgConst.payE);
    const res2 = await BillService.repository.update(billUpdateDto.body.id, {
      status: 2,
      payTime: () => "NOW()"
    });
    if (res2.affected != 0 && bill.pmid != null) {
      PaymentService.repository.update(bill.pmid, {status: 2, payTime: () => "NOW()"});
    }

    return Result.isOrNot(res2.affected != 0, MsgConst.bill.update);
  }
  
  /**
   * 账单查询业务逻辑处理
   * 
   * @param billQueryDto 账单查询DTO
   * @returns Result
   */
  async query(billQueryDto: BillQueryDto) {
    if (!(await PowerService.get(billQueryDto)).uMoney) return Result.fail(MsgConst.powerLowE);

    let [data, total] = await BillService.repository.findAndCount({
      skip: (billQueryDto.body.pageIndex - 1) * billQueryDto.body.pageSize,
      take: billQueryDto.body.pageSize,
      order: {
        id: "DESC"
      },
      where: {
        status: billQueryDto.body.paid ? 2 : 0
      }
    }); 
    let data1: any = data;
    data1.forEach((item) => {
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
      if (item.payTime != null) item.payTime = TimeTool.convertToDate(item.payTime);
    });

    return Result.success(MsgConst.bill.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
