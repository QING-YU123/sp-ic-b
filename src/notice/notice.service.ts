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
  
  async create(noticeCreateDto: NoticeCreateDto) {
    if (!(await PowerService.get(noticeCreateDto)).mNotice) return Result.fail(MsgConst.powerLowE);
    noticeCreateDto.body.uid = noticeCreateDto.checkingUid;
    
    const res = await NoticeService.repository.save(noticeCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.notice.create);
  }

  async delete(noticeDeleteDto: NoticeDeleteDto) { 
    if (!(await PowerService.get(noticeDeleteDto)).mNotice) return Result.fail(MsgConst.powerLowE);

    const res = await NoticeService.repository.update(noticeDeleteDto.body.id, { status: 1 });
    
    return Result.isOrNot(res.affected != 0, MsgConst.notice.delete);
  }

  async update(noticeUpdateDto: NoticeUpdateDto) { 
    if (!(await PowerService.get(noticeUpdateDto)).mNotice) return Result.fail(MsgConst.powerLowE);

    const res = await NoticeService.repository.update(noticeUpdateDto.body.id, noticeUpdateDto.body);
    
    return Result.isOrNot(res.affected != 0, MsgConst.notice.update);
  }

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
