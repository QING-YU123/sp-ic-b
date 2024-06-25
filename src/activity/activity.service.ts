import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { PowerService } from 'src/power/power.service';
import { UserService } from 'src/user/user.service';
import { In, LessThan, Repository } from 'typeorm';
import { ActivityCreateDto } from './dtos/activity.create.dto';
import { ActivityDeleteDto } from './dtos/activity.delete.dto';
import { ActivityQueryDto } from './dtos/activity.query.dto';
import { ActivityUpdateDto } from './dtos/activity.update.dto';
import { Activity } from './entities/activity.entity';
import { TimeTool } from 'src/.tools/time.tool';
import { LogService } from 'src/log/log.service';

/**
 * 活动模块服务层
 */
@Injectable()
export class ActivityService {
  /**
   * 活动模块数据层
   */
  static repository: Repository<Activity>;
  constructor(@InjectRepository(Activity) repository: Repository<Activity>) {
    ActivityService.repository = repository;
  }

  /**
   * 活动创建业务逻辑处理
   * 
   * @param activityCreateDto 活动创建DTO
   * @returns Result
   */
  async create(activityCreateDto: ActivityCreateDto) {
    if (!(await PowerService.get(activityCreateDto)).mActivity) return Result.fail(MsgConst.powerLowE);

    activityCreateDto.body.uid = activityCreateDto.checkingUid;
    const res = await ActivityService.repository.save(activityCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.activity.create);
  }

  /**
   * 活动删除业务逻辑处理
   * 
   * @param activityDeleteDto 活动删除DTO
   * @returns Result
   */
  async delete(activityDeleteDto: ActivityDeleteDto) {
    if (!(await PowerService.get(activityDeleteDto)).mActivity) return Result.fail(MsgConst.powerLowE);

    const res = await ActivityService.repository.update(activityDeleteDto.body.id, { status: 1 });
    
    return Result.isOrNot(res.affected != 0, MsgConst.activity.delete);
  }

  /**
   * 活动更新业务逻辑处理
   * 
   * @param activityUpdateDto 活动更新DTO
   * @returns Result
   */
  async update(activityUpdateDto: ActivityUpdateDto) {
    if (!(await PowerService.get(activityUpdateDto)).mActivity) return Result.fail(MsgConst.powerLowE);

    const res = await ActivityService.repository.update(activityUpdateDto.body.id, activityUpdateDto.body);

    return Result.isOrNot(res.affected != 0, MsgConst.activity.update);
  }

  /**
   * 活动查询业务逻辑处理
   * 
   * @param activityQueryDto 活动查询DTO
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
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
      item.startTime = TimeTool.convertToDate(item.startTime);
      item.endTime = TimeTool.convertToDate(item.endTime);
    });

    return Result.success(MsgConst.activity.query + MsgConst.success, {
      data : data,
      total : total
    });
  }

  /**
   * 定时任务：更新活动状态为已结束
   */
  static async intervalTask() {
    setInterval(async () => { 
      const res = await ActivityService.repository.update({
        status: 0,
        endTime: LessThan(TimeTool.getTime())
      }, { status: 3 });
      if (res.affected > 0) LogService.add(0, 0, "定时任务：更新活动状态为已结束", "本次更新状态数量为：" + res.affected);
    }, 60000);
  }
}
