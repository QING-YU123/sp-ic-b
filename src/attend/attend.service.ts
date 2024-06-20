import { Injectable } from '@nestjs/common';
import { Attend } from './entities/attend.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendCreateDto } from './dtos/attend.create.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { AttendUpdateDto } from './dtos/attend.update.dto';
import { AttendQueryDto } from './dtos/attend.query.dto';
import { UserService } from 'src/user/user.service';
import { ActivityService } from 'src/activity/activity.service';
import { NumberTool } from 'src/.tools/number.tool';

@Injectable()
export class AttendService {
  static repository: Repository<Attend>;
  constructor(@InjectRepository(Attend) repository: Repository<Attend>) { 
    AttendService.repository = repository;
  }

  /**
   * 参加记录创建业务逻辑处理
   * 
   * @param attendCreateDto 参加记录创建数据传输对象
   * @returns Result
   */
  async create(attendCreateDto: AttendCreateDto) { 
    if (!(await PowerService.get(attendCreateDto)).uActivity) return Result.fail(MsgConst.powerLowE);
    if ((await AttendService.repository.countBy({
      aid: attendCreateDto.body.aid,
      uid: attendCreateDto.body.uid
    })) != 0) return Result.fail(MsgConst.hadAttendE);
    
    attendCreateDto.body.uid = attendCreateDto.checkingUid;
    const res = await AttendService.repository.save(attendCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.attend.create);
  }

  /**
   * 参加记录更新业务逻辑处理
   * 
   *@param attendUpdateDto 参加记录更新数据传输对象
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
   * @param attendQueryDto 参加记录查询数据传输对象
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

    const [data , total] = await AttendService.repository.findAndCount({
      skip: (attendQueryDto.body.pageIndex -1) * attendQueryDto.body.pageSize,
      take: attendQueryDto.body.pageSize,
      order: {
        id: "DESC"
      },
      where: {
        uid: uidCondition,
        aid: aidCondition,
      }
    });

    return Result.success(MsgConst.attend.query + MsgConst.success,{
      data : data,
      total : total
    });
  }
}
