import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { NumberTool } from 'src/.tools/number.tool';
import { PowerService } from 'src/power/power.service';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { AttendCreateDto } from './dtos/attend.create.dto';
import { AttendQueryDto } from './dtos/attend.query.dto';
import { AttendUpdateDto } from './dtos/attend.update.dto';
import { Attend } from './entities/attend.entity';
import { ActivityService } from 'src/activity/activity.service';

/**
 * 活动参加记录模块服务层
 */
@Injectable()
export class AttendService {
  /**
   * 活动参加记录模块数据层
   */
  static repository: Repository<Attend>;
  constructor(@InjectRepository(Attend) repository: Repository<Attend>) { 
    AttendService.repository = repository;
  }

  /**
   * 创建参加记录业务逻辑处理
   * 
   * @param attendCreateDto 参加记录创建DTO
   * @returns Result
   */
  async create(attendCreateDto: AttendCreateDto) { 
    if (!(await PowerService.get(attendCreateDto)).uActivity) return Result.fail(MsgConst.powerLowE);
    attendCreateDto.body.uid = attendCreateDto.checkingUid;
    if ((await AttendService.repository.countBy(attendCreateDto.body)) != 0) return Result.fail(MsgConst.hadAttendE);
    
    const res = await AttendService.repository.save(attendCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.attend.create);
  }

  /**
   * 活动举办人修改活动参与证明
   * 
   * @param attendUpdateDto 参加记录更新DTO
   * @returns Result
   */
  async update(attendUpdateDto: AttendUpdateDto) {
    if (!(await PowerService.get(attendUpdateDto)).mActivity) return Result.fail(MsgConst.powerLowE);
    
    const res = await AttendService.repository.update(attendUpdateDto.body.id, attendUpdateDto.body);

    return Result.isOrNot(res.affected != 0, MsgConst.attend.update);
  }

  /**
   * 参加记录查询业务逻辑处理
   * 
   * @param attendQueryDto 参加记录查询DTO
   * @returns Result
   */
  async query(attendQueryDto: AttendQueryDto){
    const power = await PowerService.get(attendQueryDto);
    const power1 = await UserService.repository.findOne({ select: ['power'], where: { id: attendQueryDto.checkingUid } });
    let uidCondition: number = null;
    let aidCondition: number = null;
    if (power1.power == 3) { 
      uidCondition = attendQueryDto.checkingUid;
    } else if (power.mAdmin1) {
      if (NumberTool.isInteger(attendQueryDto.body.uid)) uidCondition = attendQueryDto.body.uid;
      if (NumberTool.isInteger(attendQueryDto.body.aid)) aidCondition = attendQueryDto.body.aid;
      if (uidCondition == null && aidCondition == null) return Result.fail(MsgConst.idNotExistE);
    } else {
      if (!NumberTool.isInteger(attendQueryDto.body.aid)) return Result.fail(MsgConst.idNotExistE);
      aidCondition = attendQueryDto.body.aid;
    }

    let [data, total] = await AttendService.repository.findAndCount({
      skip: (attendQueryDto.body.pageIndex - 1) * attendQueryDto.body.pageSize,
      take: attendQueryDto.body.pageSize,
      order: {
        id: "DESC"
      },
      where: {
        uid: uidCondition,
        aid: aidCondition,
      }
    });
    let activity = await ActivityService.repository.find({ where: { id: In([data.map(item => item.aid)]) } });
    activity.forEach(item => { item.coverImg = item.coverImg.toString(); });
    let data1: any = data;
    data1.forEach(item => {
      item.activity = activity.find(activityItem => activityItem.id == item.aid);
      if (item.result != null) item.result = item.result.toString();
    });

    return Result.success(MsgConst.attend.query + MsgConst.success,{
      data : data,
      total : total
    });
  }
}
