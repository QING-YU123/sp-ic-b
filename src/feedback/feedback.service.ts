import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackCreateDto } from './dtos/feedback.create.dto';
import { TimeTool } from 'src/.tools/time.tool';

@Injectable()
export class FeedbackService {
  static repository: Repository<Feedback>;
  constructor(@InjectRepository(Feedback) repository: Repository<Feedback>) { 
    FeedbackService.repository = repository;
  }

  async create(feedbackCreateDto: FeedbackCreateDto) {
    //feedbackCreateDto.body.createdTime = TimeTool.getNowString();

    return await FeedbackService.repository.save(feedbackCreateDto.body);
  }
}
