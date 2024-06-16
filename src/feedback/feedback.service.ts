import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackCreateDto } from './dtos/feedback.create.dto';
import { FeedbackDeleteDto } from './dtos/feedback.delete.dto';
import { TimeTool } from 'src/.tools/time.tool';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { FeedbackUpdateDto } from './dtos/feedback.update.dto';
import { FeedbackQueryDto } from './dtos/feedback.query.dto';

@Injectable()
export class FeedbackService {
  static repository: Repository<Feedback>;
  constructor(@InjectRepository(Feedback) repository: Repository<Feedback>) { 
    FeedbackService.repository = repository;
  }

  async create(feedbackCreateDto: FeedbackCreateDto) {
    if (!(await PowerService.get(feedbackCreateDto)).mOutsider) return Result.fail('权限不足');

    const res = FeedbackService.repository.save(feedbackCreateDto.body);

    return Result.isOrNot(res != null, '反馈失败');
  }

  async delete(feedbackDeleteDto: FeedbackDeleteDto) {
    if (!(await PowerService.get(feedbackDeleteDto)).mOutsider) return Result.fail('权限不足');
    
    const res = await FeedbackService.repository.update(feedbackDeleteDto.body.id, {status: 1});

    return Result.isOrNot(res.affected != 0, '反馈记录删除失败');
  }

  async update(feedbackUpdateDto: FeedbackUpdateDto) {
    if (!(await PowerService.get(feedbackUpdateDto)).mOutsider) return Result.fail('权限不足');

    const res = await FeedbackService.repository.update(feedbackUpdateDto.body.id,
      { result: feedbackUpdateDto.body.result, status: 2 });

    return Result.isOrNot(res.affected != 0, '反馈记录更新失败');
  }

  async query(feedbackQueryDto: FeedbackQueryDto) {
    if (!(await PowerService.get(feedbackQueryDto)).mOutsider) return Result.fail('权限不足');
    
    // 分页查询
    const [data, total] = await FeedbackService.repository.findAndCount({
      skip: (feedbackQueryDto.body.pageIndex - 1) * feedbackQueryDto.body.pageSize,
      take: feedbackQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      // 通过OR条件筛选
      where: {
        // status除了1之外的都要筛选
        status: In([0, 2]),
        
      }
    });
    
    return Result.success({
      data: data,
      total: total
    });
  }
}
