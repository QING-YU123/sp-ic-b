import { Injectable } from '@nestjs/common';
import { OutsiderCreateDto } from './dtos/outsider.create.dto';
import { Outsider } from './entities/outsider.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from 'src/.dtos/result';
import { OutsiderDeleteDto } from './dtos/outsider.delete.dto';
import { OutsiderUpdateDto } from './dtos/outsider.update.dto';
import { OutsiderQueryDto } from './dtos/outsider.query.dto';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class OutsiderService {
  static repository: Repository<Outsider>;
  constructor(@InjectRepository(Outsider) repository: Repository<Outsider>) { 
    OutsiderService.repository = repository;
  }
    
  async create(outsiderCreateDto: OutsiderCreateDto) {
    if (!(await PowerService.get(outsiderCreateDto)).mOutsider) return Result.fail('权限不足');
    
    const res = OutsiderService.repository.save(outsiderCreateDto.body);

    return Result.isOrNot(res != null);
  }
  
  async delete(outsiderDeleteDto: OutsiderDeleteDto) {
    if (!(await PowerService.get(outsiderDeleteDto)).mOutsider) return Result.fail('权限不足');
    
    const res = await OutsiderService.repository.update(outsiderDeleteDto.body.id, { leaveTime: () => "NOW()" });

    return Result.isOrNot(res.affected != 0);
  }
  
  async update(outsiderUpdateDto: OutsiderUpdateDto) {
    if (!(await PowerService.get(outsiderUpdateDto)).mOutsider) return Result.fail('权限不足');

    const res = await OutsiderService.repository.update(outsiderUpdateDto.body.id, outsiderUpdateDto.body);

    return Result.isOrNot(res.affected != 0);
  }
  
  async query(outsiderQueryDto: OutsiderQueryDto) {
    if (!(await PowerService.get(outsiderQueryDto)).mOutsider) return Result.fail('权限不足');
    
    // 分页查询
    const [data, total] = await OutsiderService.repository.findAndCount({
      skip: (outsiderQueryDto.body.pageIndex - 1) * outsiderQueryDto.body.pageSize,
      take: outsiderQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      }
    });

    return Result.success({
      data: data,
      total: total
    });
  }
}
