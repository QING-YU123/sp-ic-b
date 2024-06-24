import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { LogQueryDto } from './dtos/log.query.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { LogCreateDto } from './dtos/log.create.dto';
import { UserService } from 'src/user/user.service';
import { TimeTool } from 'src/.tools/time.tool';

/**
 * 日志模块服务层
 */
@Injectable()
export class LogService {
  /** 
   * 日志模块数据层
   */
  static repository: Repository<Log>;
  constructor(@InjectRepository(Log) repository: Repository<Log>) { 
    LogService.repository = repository;
  }
  
  /**
   * 日志创建业务逻辑处理
   * 
   * @param logCreateDto 日志创建DTO
   * @returns Result
   */
  async create(logCreateDto: LogCreateDto) {
    if (!(await PowerService.get(logCreateDto)).mAdmin1) return Result.fail(MsgConst.powerLowE);

    return LogService.add(logCreateDto.checkingUid, logCreateDto.body.type, logCreateDto.body.content);
  }

  /**
   * 静态方法，用来在其他位置创建日志
   * 
   * @param uid 用户ID
   * @param type 日志类型
   * @param content 日志内容
   * @returns Result
   */
  static async add(uid: number, type: number, content: string, result?: string, url?: string) { 
    const user = await UserService.repository.findOne({
      select: ['id','name', 'username', 'phone'],
      where: { id: uid }
    });

    const log = await LogService.repository.save({
      uid: uid,
      name: user == null ? "null" : user.name,
      username: user == null ? "null" : user.username,
      phone: user == null ? "null" : user.phone,
      type: type,
      content: content,
      result: result,
      url: url
    });

    return Result.isOrNot(log != null, MsgConst.log.create);
  }
  
  /**
   * 日志查询业务逻辑处理
   * 
   * @param logQueryDto 日志查询DTO
   * @returns Result
   */
  async query(logQueryDto: LogQueryDto) {
    if (!(await PowerService.get(logQueryDto)).mAdmin1) return Result.fail(MsgConst.powerLowE);

    let [data, total] = await LogService.repository.findAndCount({
      skip: (logQueryDto.body.pageIndex - 1) * logQueryDto.body.pageSize,
      take: logQueryDto.body.pageSize,
      where: {
        type: logQueryDto.body.type,
        createdTime: Between(logQueryDto.body.date, logQueryDto.body.date + 'T23:59:59')
      },
      order: {
        id: 'DESC'
      }
    });
    let data1: any = data;
    data1.forEach(item => {
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
    });

    return Result.success(MsgConst.log.query + MsgConst.success, {
      data: data,
      total: total,
    });
  }
}
