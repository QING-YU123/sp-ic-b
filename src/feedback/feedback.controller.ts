import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackCreateDto } from './dtos/feedback.create.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }
  
  @Post('create')
  async create(@Body() feedbackCreateDto: FeedbackCreateDto) {
    console.log(feedbackCreateDto);
    return await this.feedbackService.create(feedbackCreateDto);
  }
}
