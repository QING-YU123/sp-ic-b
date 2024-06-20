import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { In, Repository } from 'typeorm';
import { ActivityCreateDto } from './dtos/activity.create.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { ActivityDeleteDto } from './dtos/activity.delete.dto';
import { ActivityUpdateDto } from './dtos/activity.update.dto';
import { ActivityQueryDto } from './dtos/activity.query.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ActivityService {
  static repository: Repository<Activity>;
  constructor(@InjectRepository(Activity) repository: Repository<Activity>) {
    ActivityService.repository = repository;
  }

  /**
   * 用户创建业务逻辑处理
   * 
   * @param activityCreateDto 用户创建数据传输对象
   * @returns Result
   */
  async create(activityCreateDto: ActivityCreateDto) {
    if (!(await PowerService.get(activityCreateDto)).mActivity) return Result.fail(MsgConst.powerLowE);

    activityCreateDto.body.uid = activityCreateDto.checkingUid;
    const res = await ActivityService.repository.save(activityCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.activity.create);
  }

  /**
   * 用户删除业务逻辑处理
   * 
   * @param activityDeleteDto 用户删除数据传输对象
   * @returns Result
   */
  async delete(activityDeleteDto: ActivityDeleteDto) {
    if (!(await PowerService.get(activityDeleteDto)).mActivity) return Result.fail(MsgConst.powerLowE);

    const res = await ActivityService.repository.update(activityDeleteDto.body.id, { status: 1 });
    
    return Result.isOrNot(res.affected != 0, MsgConst.activity.delete);
  }

  /**
   * 用户更新业务逻辑处理
   * 
   * @param activityUpdateDto 用户更新数据传输对象
   * @returns Result
   */
  async update(activityUpdateDto: ActivityUpdateDto) {
    if (!(await PowerService.get(activityUpdateDto)).mActivity) return Result.fail(MsgConst.powerLowE);

    const res = await ActivityService.repository.update(activityUpdateDto.body.id, activityUpdateDto.body);

    return Result.isOrNot(res.affected != 0, MsgConst.activity.update);
  }

  /**
   * 用户查询业务逻辑处理
   * 
   * @param activityQueryDto 用户查询数据传输对象
   * @returns Result
   */
  async query(activityQueryDto: ActivityQueryDto) {
    if (!(await PowerService.get(activityQueryDto)).uActivity) return Result.fail(MsgConst.powerLowE);
    const power1 = await UserService.repository.findOne({ select : ['power'] , where : { id : activityQueryDto.checkingUid } });

    let [data, total] = await ActivityService.repository.findAndCount({
      skip: (activityQueryDto.body.pageIndex - 1) * activityQueryDto.body.pageSize,
      take: activityQueryDto.body.pageSize,
      where: {
        status: In(power1.power == 3 ? [0, 2] : [0, 2, 3, 4]),
        type: activityQueryDto.body.type,
      }
    });
    data.forEach(item => {
      item.coverImg = item.coverImg.toString();
    });

    return Result.success(MsgConst.activity.query + MsgConst.success, {
      data : data,
      total : total
    });
  }
}
