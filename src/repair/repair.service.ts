import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Repair } from './entities/repair.entity';
import { RepairCreateDto } from './dtos/repair.create.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { RepairDeleteDto } from './dtos/repair.delete.dto';
import { RepairUpdateDto } from './dtos/repair.update.dto';
import { RepairQueryDto } from './dtos/repair.query.dto';
import { MsgConst } from 'src/.const/msg.const';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RepairService {
  static repository: Repository<Repair>;
  constructor(@InjectRepository(Repair) repository: Repository<Repair>) { 
    RepairService.repository = repository;
  }

  async create(repairCreateDto: RepairCreateDto) {
    if (!(await PowerService.get(repairCreateDto)).uRepair) return Result.fail(MsgConst.powerLowE);

    repairCreateDto.body.uid = repairCreateDto.checkingUid;
    const res = RepairService.repository.save(repairCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.repair.create);
  }

  async delete(repairDeleteDto: RepairDeleteDto) {
    if (!(await PowerService.get(repairDeleteDto)).mRepair) return Result.fail(MsgConst.powerLowE);
    
    const res = await RepairService.repository.update(repairDeleteDto.body.id, {status: 1});

    return Result.isOrNot(res.affected != 0, MsgConst.repair.delete);
  }

  async update(repairUpdateDto: RepairUpdateDto) {
    if (!(await PowerService.get(repairUpdateDto)).mRepair) return Result.fail(MsgConst.powerLowE);

    const res = await RepairService.repository.update(repairUpdateDto.body.id,
      {status: repairUpdateDto.body.status});

    return Result.isOrNot(res.affected != 0, MsgConst.repair.update);
  }

  async query(repairQueryDto: RepairQueryDto) {
    if (!(await PowerService.get(repairQueryDto)).mRepair) return Result.fail(MsgConst.powerLowE);
    
    const [data, total] = await RepairService.repository.findAndCount({
      skip: (repairQueryDto.body.pageIndex - 1) * repairQueryDto.body.pageSize,
      take: repairQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      where: {
        // status除了1之外的都要筛选
        status: In([0, 2, 3]),
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
