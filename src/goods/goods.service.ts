import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MsgConst } from 'src/.const/msg.const';
import { VarConst } from 'src/.const/var.const';
import { Result } from 'src/.dtos/result';
import { BillService } from 'src/bill/bill.service';
import { PowerService } from 'src/power/power.service';
import { StoreService } from 'src/store/store.service';
import { Repository } from 'typeorm';
import { GoodsBuyDto } from './dtos/goods.buy.dto';
import { GoodsCreateDto } from './dtos/goods.create.dto';
import { GoodsDeleteDto } from './dtos/goods.delete.dto';
import { GoodsQueryDto } from './dtos/goods.query.dto';
import { GoodsUpdateDto } from './dtos/goods.update.dto';
import { Goods } from './entities/goods.entity';
import { TimeTool } from 'src/.tools/time.tool';

/**
 * 货物模块服务层
 */
@Injectable()
export class GoodsService {
  /**
   * 货物模块数据层
   */
  static repository: Repository<Goods>;
  constructor(@InjectRepository(Goods) repository: Repository<Goods>) {
    GoodsService.repository = repository;
  }

  /**
   * 商品创建业务逻辑处理
   * 
   * @param goodsCreateDto 商品创建DTO
   * @returns Result
   */
  async create(goodsCreateDto: GoodsCreateDto) {
    const shopkeeper = await StoreService.repository.findOne({ select: ['uid'], where: { id: goodsCreateDto.body.sid } });
    if (goodsCreateDto.checkingUid != shopkeeper.uid) {
      return Result.fail(MsgConst.powerLowE);
    }

    const res = await GoodsService.repository.save(goodsCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.goods.create);
  }
  
  /**
   * 商品删除业务逻辑处理
   * 
   * @param goodsDeleteDto 商品删除DTO
   * @returns Result
   */
  async delete(goodsDeleteDto: GoodsDeleteDto) {  
    const power = await PowerService.get(goodsDeleteDto);
    const store = await GoodsService.repository.findOne({ select: ['sid'], where: { id: goodsDeleteDto.body.id } });
    let status1: number;
    const shopkeeper = await StoreService.repository.findOne({ select: ['uid'], where: { id: store.sid } });
    if (goodsDeleteDto.checkingUid == shopkeeper.uid) {
      status1 = 1;
    } else {
      if (power.mAdmin1) {
        status1 = 2;
      } else {
        return Result.fail(MsgConst.powerLowE);
      }
    }

    const res = await GoodsService.repository.update(goodsDeleteDto.body.id, { status: status1 });

    return Result.isOrNot(res.affected != 0, MsgConst.goods.delete);
  }

  /**
   * 商品更新业务逻辑处理
   * 
   * @param goodsUpdateDto 商品更新DTO
   * @returns Result
   */
  async update(goodsUpdateDto: GoodsUpdateDto) {
    const shopkeeper = await StoreService.repository.findOne({ select: ['uid'], where: { id: goodsUpdateDto.body.sid } });
    if (!(await PowerService.get(goodsUpdateDto)).mAdmin0) {
      if (goodsUpdateDto.checkingUid != shopkeeper.uid) {
        return Result.fail(MsgConst.powerLowE);
      }
    }

    const res = await GoodsService.repository.update(goodsUpdateDto.body.id, goodsUpdateDto.body);

    return Result.isOrNot(res.affected != 0, MsgConst.goods.update);
  }

  /**
   * 商品查询业务逻辑处理
   * 
   * @param goodsQueryDto 商品查询DTO
   * @returns Result
   */
  async query(goodsQueryDto: GoodsQueryDto) {
    if (!(await PowerService.get(goodsQueryDto)).uMoney) return Result.fail(MsgConst.powerLowE);

    let [data, total] = await GoodsService.repository.findAndCount({
      skip: (goodsQueryDto.body.pageIndex - 1) * goodsQueryDto.body.pageSize,
      take: goodsQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      where: {
        status: 0,
      }
    });
    data.forEach(item => {
      item.coverImg = item.coverImg.toString();
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
    });

    return Result.success(MsgConst.goods.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
  
  /**
   * 商品购买业务逻辑处理
   * 
   * @param goodsBuyDto 商品购买DTO
   * @returns Result
   */
  async buy(goodsBuyDto: GoodsBuyDto) {
    if (!(await PowerService.get(goodsBuyDto)).uMoney) return Result.fail(MsgConst.powerLowE);
    const goods = await GoodsService.repository.findOne({
      select: ['balance', 'name', 'status', 'price', 'sid'],
      where: { id: goodsBuyDto.body.gid }
    });
    if (goods.status != 0) return Result.fail(MsgConst.goodsHadRemove);
    if (goods.balance < goodsBuyDto.body.num) return Result.fail(MsgConst.balanceNotEnough);

    const res1 = await GoodsService.repository.update(goodsBuyDto.body.gid, {
      balance: () => "goods.balance - " + goodsBuyDto.body.num,
      sold: () => "goods.sold + " + goodsBuyDto.body.num
    });
    if (res1.affected == 0) return Result.fail(MsgConst.buyFailE);
    let content: string = goods.name + " x " + goodsBuyDto.body.num + "\n";
    let price = goodsBuyDto.body.num * goods.price;
    const store = await StoreService.repository.findOne({ select: ['uid'], where: { id: goods.sid } });
    const res2 = await BillService.repository.save({
      uid: goodsBuyDto.checkingUid,
      title: VarConst.goodsBillTitle,
      content: content,
      price: price,
      receiptUid: store.uid
    });

    return Result.success(MsgConst.billCreate, res2.id);
  }
}
