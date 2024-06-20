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
import { MsgConst } from 'src/.const/msg.const';

@Injectable()
export class OutsiderService {
  static repository: Repository<Outsider>;
  constructor(@InjectRepository(Outsider) repository: Repository<Outsider>) { 
    OutsiderService.repository = repository;
  }
  
  /**
   * 外来人员创建业务逻辑处理
   * 
   * @param outsiderCreateDto 外来人员创建数据传输对象
   * @returns Result
   */
  async create(outsiderCreateDto: OutsiderCreateDto) {
    if (!(await PowerService.get(outsiderCreateDto)).mOutsider) return Result.fail(MsgConst.powerLowE);
    
    const res = OutsiderService.repository.save(outsiderCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.outsider.create);
  }
  
  /**
   * 外来人员删除业务逻辑处理
   * 
   * @param outsiderDeleteDto 外来人员删除数据传输对象
   * @returns Result
   */
  async delete(outsiderDeleteDto: OutsiderDeleteDto) {
    if (!(await PowerService.get(outsiderDeleteDto)).mOutsider) return Result.fail(MsgConst.powerLowE);
    
    const res = await OutsiderService.repository.update(outsiderDeleteDto.body.id, { leaveTime: () => "NOW()" });

    return Result.isOrNot(res.affected != 0, MsgConst.outsider.delete);
  }
  
  /**
   * 外来人员更新业务逻辑处理
   * 
   * @param outsiderUpdateDto 外来人员更新数据传输对象
   * @returns Result
   */
  async update(outsiderUpdateDto: OutsiderUpdateDto) {
    if (!(await PowerService.get(outsiderUpdateDto)).mOutsider) return Result.fail(MsgConst.powerLowE);

    const res = await OutsiderService.repository.update(outsiderUpdateDto.body.id, outsiderUpdateDto.body);

    return Result.isOrNot(res.affected != 0, MsgConst.outsider.update);
  }
  
  /**
   * 外来人员查询业务逻辑处理
   * 
   * @param outsiderQueryDto 外来人员查询数据传输对象
   * @returns Result
   */
  async query(outsiderQueryDto: OutsiderQueryDto) {
    if (!(await PowerService.get(outsiderQueryDto)).mOutsider) return Result.fail(MsgConst.powerLowE);
    
    const [data, total] = await OutsiderService.repository.findAndCount({
      skip: (outsiderQueryDto.body.pageIndex - 1) * outsiderQueryDto.body.pageSize,
      take: outsiderQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      }
    });

    return Result.success(MsgConst.outsider.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
