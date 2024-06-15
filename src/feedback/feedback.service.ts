import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackCreateDto } from './dtos/feedback.create.dto';
import { TimeTool } from 'src/.tools/time.tool';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';

@Injectable()
export class FeedbackService {
  static repository: Repository<Feedback>;
  constructor(@InjectRepository(Feedback) repository: Repository<Feedback>) { 
    FeedbackService.repository = repository;
  }

  async create(feedbackCreateDto: FeedbackCreateDto) {
    if (!(await PowerService.get(feedbackCreateDto)).mOutsider) return Result.fail('权限不足');

    const res = FeedbackService.repository.save(feedbackCreateDto.body);

    return Result.isOrNot(res != null);
  }
}
