import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { PowerService } from 'src/power/power.service';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { StoreCreateDto } from './dtos/store.create.dto';
import { StoreDeleteDto } from './dtos/store.delete.dto';
import { StoreQueryDto } from './dtos/store.query.dto';
import { StoreUpdateDto } from './dtos/store.update.dto';
import { Store } from './entities/store.entity';
import { TimeTool } from 'src/.tools/time.tool';

/**
 * 店铺模块服务层
 */
@Injectable()
export class StoreService {
  /** 
   * 店铺模块数据层
   */
  static repository: Repository<Store>;
  constructor(@InjectRepository(Store) repository: Repository<Store>) {
    StoreService.repository = repository;
  }

  /**
   * 店铺创建业务逻辑处理
   * 
   * @param storeCreateDto 店铺创建DTO
   * @returns Result
   */
  async create(storeCreateDto: StoreCreateDto) {
    if (!(await PowerService.get(storeCreateDto)).mStore) return Result.fail(MsgConst.powerLowE);
      
    storeCreateDto.body.uid = storeCreateDto.checkingUid;
    const res = StoreService.repository.save(storeCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.store.create);
  }
  
  /**
   * 店铺删除业务逻辑处理
   * 
   * @param storeDeleteDto 店铺删除DTO
   * @returns Result
   */
  async delete(storeDeleteDto: StoreDeleteDto) {
    const user = await StoreService.repository.findOne({ select: ['uid'], where: { id: storeDeleteDto.body.id } });

    let res: any;
    if (user.uid == storeDeleteDto.checkingUid) {
      res = await StoreService.repository.update(storeDeleteDto.body.id, { status: 1 });
    } else if ((await PowerService.get(storeDeleteDto)).mStoreApprove) {
      res = await StoreService.repository.update(storeDeleteDto.body.id, { status: 2 });
    } else {
      return Result.fail(MsgConst.powerLowE);
    }

    return Result.isOrNot(res.affected != 0, MsgConst.store.delete);
  }

  /**
   * 店铺更新业务逻辑处理
   * 
   * @param storeUpdateDto 店铺更新DTO
   * @returns Result
   */
  async update(storeUpdateDto: StoreUpdateDto) {
    const user = await StoreService.repository.findOne({ select: ['uid'], where: { id: storeUpdateDto.body.id } });
    if (user.uid != storeUpdateDto.checkingUid) {
      if(!(await PowerService.get(storeUpdateDto)).mStoreApprove) return Result.fail(MsgConst.powerLowE);
    }

    const res = await StoreService.repository.update(storeUpdateDto.body.id, storeUpdateDto.body);

    return Result.isOrNot(res.affected != 0, MsgConst.store.update);
  }

  /**
   * 店铺查询业务逻辑处理
   * 
   * @param storeQueryDto 店铺查询DTO
   * @returns Result
   */
  async query(storeQueryDto: StoreQueryDto) {
    if (!(await PowerService.get(storeQueryDto)).mStore) return Result.fail(MsgConst.powerLowE);

    const [data, total] = await StoreService.repository.findAndCount({
      skip: (storeQueryDto.body.pageIndex - 1) * storeQueryDto.body.pageSize,
      take: storeQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      where: {
        status: In([0, 3]),
        uid: storeQueryDto.body.myStore ? storeQueryDto.checkingUid : null
      }
    });
    const user = await UserService.repository.find({
      select: ["id", "name"],
      where: { id: In(data.map(item => item.uid)) }
    });
    let data1: any = data;
    data1.forEach(item => {
      const u = user.find(userItem => userItem.id === item.uid);
      item.bossName = u.name;
      item.coverImg = item.coverImg.toString();
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
    });

    return Result.success(MsgConst.store.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
