import { Injectable } from '@nestjs/common';
import { Notice } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NoticeCreateDto } from './dtos/notice.create.dto';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { PowerService } from 'src/power/power.service';
import { NoticeDeleteDto } from './dtos/notice.delete.dto';
import { NoticeUpdateDto } from './dtos/notice.update.dto';
import { NoticeQueryDto } from './dtos/notice.query.dto';
import { NoticeReadDto } from './dtos/notice.read.dto';
import { TimeTool } from 'src/.tools/time.tool';

/**
 * 通知公告服务层
 */
@Injectable()
export class NoticeService {
  /**
   * 通知公告数据层
   */
  static repository: Repository<Notice>;
  constructor(@InjectRepository(Notice) repository: Repository<Notice>) { 
    NoticeService.repository = repository;
  }
  
  /**
   * 通知公告创建业务逻辑处理
   * 
   * @param noticeCreateDto 通知公告创建DTO
   * @returns Result
   */
  async create(noticeCreateDto: NoticeCreateDto) {
    if (!(await PowerService.get(noticeCreateDto)).mNotice) return Result.fail(MsgConst.powerLowE);
    noticeCreateDto.body.uid = noticeCreateDto.checkingUid;
    
    const res = await NoticeService.repository.save(noticeCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.notice.create);
  }

  /**
   * 通知公告删除业务逻辑处理
   * 
   * @param noticeDeleteDto 通知公告删除DTO
   * @returns Result
   */
  async delete(noticeDeleteDto: NoticeDeleteDto) { 
    if (!(await PowerService.get(noticeDeleteDto)).mNotice) return Result.fail(MsgConst.powerLowE);

    const res = await NoticeService.repository.update(noticeDeleteDto.body.id, { status: 1 });
    
    return Result.isOrNot(res.affected != 0, MsgConst.notice.delete);
  }

  /**
   * 通知公告更新业务逻辑处理
   * 
   * @param noticeUpdateDto 通知公告更新DTO
   * @returns Result
   */
  async update(noticeUpdateDto: NoticeUpdateDto) { 
    if (!(await PowerService.get(noticeUpdateDto)).mNotice) return Result.fail(MsgConst.powerLowE);

    const res = await NoticeService.repository.update(noticeUpdateDto.body.id, noticeUpdateDto.body);
    
    return Result.isOrNot(res.affected != 0, MsgConst.notice.update);
  }

  /**
   * 通知公告查询业务逻辑处理
   * 
   * @param noticeQueryDto 通知公告查询DTO
   * @returns Result
   */
  async query(noticeQueryDto: NoticeQueryDto) { 
    const power = await PowerService.get(noticeQueryDto);
    if (!power.uNotice) return Result.fail(MsgConst.powerLowE);

    let [data, total] = await NoticeService.repository.findAndCount({
      skip: (noticeQueryDto.body.pageIndex - 1) * noticeQueryDto.body.pageSize,
      take: noticeQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      where: {
        status: In(power.mNotice ? [0, 2] : [0])
      }
    });
    let data1: any = data;
    data1.forEach(item => {
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
    });
    
    return Result.success(MsgConst.notice.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
  
  /**
   * 通知公告阅读业务逻辑处理
   * 
   * @param noticeReadDto 通知公告阅读DTO
   * @returns Result
   */
  async read(noticeReadDto: NoticeReadDto) {
    if (!(await PowerService.get(noticeReadDto)).uNotice) return Result.fail(MsgConst.powerLowE);

    const res = await NoticeService.repository.update(noticeReadDto.body.id, { readNum: () => "readNum + 1" });
    
    return Result.isOrNot(res.affected != 0, MsgConst.notice.read);
  }
}
