import { Injectable } from '@nestjs/common';
import { Notice } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticeCreateDto } from './dtos/notice.create.dto';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { PowerService } from 'src/power/power.service';
import { NoticeDeleteDto } from './dtos/notice.delete.dto';
import { NoticeUpdateDto } from './dtos/notice.update.dto';
import { NoticeQueryDto } from './dtos/notice.query.dto';

@Injectable()
export class NoticeService {
  static repository: Repository<Notice>;
  constructor(@InjectRepository(Notice) repository: Repository<Notice>) { 
    NoticeService.repository = repository;
  }
  
  /**
   * 公告创建业务逻辑处理
   * 
   * @param noticeCreateDto 公告创建数据传输对象
   * @returns Result
   */
  async create(noticeCreateDto: NoticeCreateDto) {
    if (!(await PowerService.get(noticeCreateDto)).mNotice) return Result.fail(MsgConst.powerLowE);
    noticeCreateDto.body.uid = noticeCreateDto.checkingUid;
    
    const res = await NoticeService.repository.save(noticeCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.notice.create);
  }

  /**
   * 公告删除业务逻辑处理
   * 
   * @param noticeDeleteDto 公告删除数据传输对象
   * @returns Result
   */
  async delete(noticeDeleteDto: NoticeDeleteDto) { 
    if (!(await PowerService.get(noticeDeleteDto)).mNotice) return Result.fail(MsgConst.powerLowE);

    const res = await NoticeService.repository.update(noticeDeleteDto.body.id, { status: 1 });
    
    return Result.isOrNot(res.affected != 0, MsgConst.notice.delete);
  }

  /**
   * 公告更新业务逻辑处理
   * 
   * @param noticeUpdateDto 公告更新数据传输对象
   * @returns Result
   */
  async update(noticeUpdateDto: NoticeUpdateDto) { 
    if (!(await PowerService.get(noticeUpdateDto)).mNotice) return Result.fail(MsgConst.powerLowE);

    const res = await NoticeService.repository.update(noticeUpdateDto.body.id, noticeUpdateDto.body);
    
    return Result.isOrNot(res.affected != 0, MsgConst.notice.update);
  }

  /**
   * 公告查询业务逻辑处理
   * 
   * @param noticeQueryDto 公告查询数据传输对象
   * @returns Result
   */
  async query(noticeQueryDto : NoticeQueryDto) { 
    if (!(await PowerService.get(noticeQueryDto)).uNotice) return Result.fail(MsgConst.powerLowE);

    const [data, total] = await NoticeService.repository.findAndCount({
      skip: (noticeQueryDto.body.pageIndex - 1) * noticeQueryDto.body.pageSize,
      take: noticeQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      // 通过OR条件筛选
      where: {
        status: 0,
      }
    });
    
    return Result.success(MsgConst.notice.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
