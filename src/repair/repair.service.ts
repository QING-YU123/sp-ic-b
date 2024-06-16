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

@Injectable()
export class RepairService {
  static repository: Repository<Repair>;
  constructor(@InjectRepository(Repair) repository: Repository<Repair>) { 
    RepairService.repository = repository;
  }

  async create(repairCreateDto: RepairCreateDto) {
    if (!(await PowerService.get(repairCreateDto)).mOutsider) return Result.fail(MsgConst.powerLowE);

    const res = RepairService.repository.save(repairCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.repair.create);
  }

  async delete(repairDeleteDto: RepairDeleteDto) {
    if (!(await PowerService.get(repairDeleteDto)).mOutsider) return Result.fail(MsgConst.powerLowE);
    
    const res = await RepairService.repository.update(repairDeleteDto.body.id, {status: 1});

    return Result.isOrNot(res.affected != 0, MsgConst.repair.delete);
  }

  async update(repairUpdateDto: RepairUpdateDto) {
    if (!(await PowerService.get(repairUpdateDto)).mOutsider) return Result.fail(MsgConst.powerLowE);

    const res = await RepairService.repository.update(repairUpdateDto.body.id,
      {status: repairUpdateDto.body.status});

    return Result.isOrNot(res.affected != 0, MsgConst.repair.update);
  }

  async query(repairQueryDto: RepairQueryDto) {
    if (!(await PowerService.get(repairQueryDto)).mOutsider) return Result.fail(MsgConst.powerLowE);
    
    // 分页查询
    const [data, total] = await RepairService.repository.findAndCount({
      skip: (repairQueryDto.body.pageIndex - 1) * repairQueryDto.body.pageSize,
      take: repairQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      // 通过OR条件筛选
      where: {
        // status除了1之外的都要筛选
        status: In([0, 2, 3]),
        
      }
    });
    
    return Result.success(MsgConst.repair.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
