import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { PowerService } from 'src/power/power.service';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { RepairCreateDto } from './dtos/repair.create.dto';
import { RepairDeleteDto } from './dtos/repair.delete.dto';
import { RepairQueryDto } from './dtos/repair.query.dto';
import { RepairUpdateDto } from './dtos/repair.update.dto';
import { Repair } from './entities/repair.entity';

/**
 * 维修申报模块服务层
 */
@Injectable()
export class RepairService {
  /**
   * 维修申报模块数据层
   */
  static repository: Repository<Repair>;
  constructor(@InjectRepository(Repair) repository: Repository<Repair>) { 
    RepairService.repository = repository;
  }

  /**
   * 维修申报创建业务逻辑处理
   * 
   * @param repairCreateDto 维修申报创建DTO
   * @returns Result
   */
  async create(repairCreateDto: RepairCreateDto) {
    if (!(await PowerService.get(repairCreateDto)).uRepair) return Result.fail(MsgConst.powerLowE);

    repairCreateDto.body.uid = repairCreateDto.checkingUid;
    const res = RepairService.repository.save(repairCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.repair.create);
  }

  /**
   * 维修申报删除业务逻辑处理
   * 
   * @param repairDeleteDto 维修申报删除DTO
   * @returns Result
   */
  async delete(repairDeleteDto: RepairDeleteDto) {
    if (!(await PowerService.get(repairDeleteDto)).mRepair) return Result.fail(MsgConst.powerLowE);
    
    const res = await RepairService.repository.update(repairDeleteDto.body.id, {status: 1});

    return Result.isOrNot(res.affected != 0, MsgConst.repair.delete);
  }

  /**
   * 维修申报更新业务逻辑处理
   * 
   * @param repairUpdateDto 维修申报更新DTO
   * @returns Result
   */
  async update(repairUpdateDto: RepairUpdateDto) {
    if (!(await PowerService.get(repairUpdateDto)).mRepair) return Result.fail(MsgConst.powerLowE);

    const res = await RepairService.repository.update(repairUpdateDto.body.id,
      {status: repairUpdateDto.body.status});

    return Result.isOrNot(res.affected != 0, MsgConst.repair.update);
  }

  /**
   * 维修申报查询业务逻辑处理
   * 
   * @param repairQueryDto 维修申报查询DTO
   * @returns Result
   */
  async query(repairQueryDto: RepairQueryDto) {
    const power = await PowerService.get(repairQueryDto);
    if (!power.uRepair) return Result.fail(MsgConst.powerLowE);
    
    const [data, total] = await RepairService.repository.findAndCount({
      skip: (repairQueryDto.body.pageIndex - 1) * repairQueryDto.body.pageSize,
      take: repairQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      where: {
        status: In([0, 2, 3]),
        uid: power.mRepair ? null : repairQueryDto.checkingUid
      }
    });
    const user = await UserService.repository.find({
      select: ["id", "name", "phone"],
      where: { id: In(data.map(item => item.uid)) }
    });
    let data1: any = data;
    data1.forEach(item => {
      const u = user.find(userItem => userItem.id === item.uid);
      item.name = u.name;
      item.phone = u.phone;
    });
    
    return Result.success(MsgConst.repair.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
