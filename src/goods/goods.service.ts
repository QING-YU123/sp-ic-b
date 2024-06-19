import { Injectable } from '@nestjs/common';
import { Goods } from './entities/goods.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GoodsCreateDto } from './dtos/goods.create.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { GoodsDeleteDto } from './dtos/goods.delete.dto';
import { GoodsUpdateDto } from './dtos/goods.update.dto';
import { GoodsQueryDto } from './dtos/goods.query.dto';
import { StoreService } from 'src/store/store.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoodsService {
  static repository: Repository<Goods>;
  constructor(@InjectRepository(Goods) repository: Repository<Goods>) {
    GoodsService.repository = repository;
  }

  async create(goodsCreateDto: GoodsCreateDto) {
    const shopkeeper = await StoreService.repository.findOne({ select: ['uid'], where: { id: goodsCreateDto.body.sid } });
    if (goodsCreateDto.checkingUid != shopkeeper.uid) {
      return Result.fail(MsgConst.powerLowE);
    }

    const res = await GoodsService.repository.save(goodsCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.goods.create);
    }

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

  async query(goodsQueryDto: GoodsQueryDto) {
    if (!(await PowerService.get(goodsQueryDto)).uMoney) return Result.fail(MsgConst.powerLowE);

    let [data, total] = await GoodsService.repository.findAndCount({
      skip: (goodsQueryDto.body.pageIndex - 1) * goodsQueryDto.body.pageSize,
      take: goodsQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      // 通过OR条件筛选
      where: {
        status: 0,
      }
    });
    data.forEach(item => {
      item.coverImg = item.coverImg.toString();
    });

    return Result.success(MsgConst.goods.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
