import { Injectable, Res } from '@nestjs/common';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, In, Repository } from 'typeorm';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { StoreCreateDto } from './dtos/store.create.dto';
import { PowerService } from 'src/power/power.service';
import { StoreDeleteDto } from './dtos/store.delete.dto';
import { StoreUpdateDto } from './dtos/store.update.dto';
import { StoreQueryDto } from './dtos/store.query.dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class StoreService {
  static repository: Repository<Store>;
  constructor(@InjectRepository(Store) repository: Repository<Store>) {
    StoreService.repository = repository;
  }

  
  async create(storeCreateDto: StoreCreateDto) {
    if (!(await PowerService.get(storeCreateDto)).mStore) return Result.fail(MsgConst.powerLowE);
      
    storeCreateDto.body.uid = storeCreateDto.checkingUid;
    const res = StoreService.repository.save(storeCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.store.create);
  }
  
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

  async update(storeUpdateDto: StoreUpdateDto) {
    const user = await StoreService.repository.findOne({ select: ['uid'], where: { id: storeUpdateDto.body.id } });
    if (user.uid != storeUpdateDto.checkingUid) {
      if(!(await PowerService.get(storeUpdateDto)).mStoreApprove) return Result.fail(MsgConst.powerLowE);
    }

    const res = await StoreService.repository.update(storeUpdateDto.body.id, storeUpdateDto.body);

    return Result.isOrNot(res.affected != 0, MsgConst.store.update);
  }

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
    });

    return Result.success(MsgConst.store.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
