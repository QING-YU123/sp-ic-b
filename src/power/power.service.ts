import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MsgConst } from 'src/.const/msg.const';
import { Dto } from 'src/.dtos/dto';
import { Result } from 'src/.dtos/result';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { PowerQueryDto } from './dtos/power.query.dto';
import { Power } from './entities/power.entity';

/**
 * 鉴权模块服务层
 */
@Injectable()
export class PowerService {
  /** 
   * 鉴权模块数据层
   */
  static repository: Repository<Power>;
  constructor(@InjectRepository(Power) repository: Repository<Power>) { 
    PowerService.repository = repository;
    this.init();
  }
  
  /**
   * 查询权限业务逻辑处理
   * 
   * @param powerQueryDto 查询权限DTO
   * @returns Result
   */
  async query(powerQueryDto: PowerQueryDto) {
    if (!(await PowerService.get(powerQueryDto)).mAdmin0) return Result.fail(MsgConst.powerLowE);

    return Result.success(MsgConst.power.query + MsgConst.success, PowerService.powerList);
  }
  
  // 声明静态存储权限列表
  static powerList: Power[] = [];

  // 初始化权限列表
  async init() {
    const res = await PowerService.repository.find();
    res.forEach((item) => { 
      PowerService.powerList[item.id] = item;
    })
  }

  /**
   * 获取权限业务逻辑处理
   * 
   * @param dto 权限数据传输对象
   * @returns Power
   */
  static async get(dto: Dto) {
    if (PowerService.powerList.length < 10) return new Power();
    const user = await UserService.repository.findOne({ select: ['power', 'status'], where: { id: dto.checkingUid } });
    if (user == null || user.status != 0) return new Power();
    return PowerService.powerList[user.power];
  }
}
