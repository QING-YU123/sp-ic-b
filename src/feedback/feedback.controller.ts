import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackCreateDto } from './dtos/feedback.create.dto';
import { NumberTool } from './../.tools/number.tool';
import { Result } from './../.dtos/result';
import { StringTool } from './../.tools/string.tool';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }
  
  @Post('create')
  async create(@Body() feedbackCreateDto: FeedbackCreateDto) {
    if (!NumberTool.isInteger(feedbackCreateDto.checkingUid)) return Result.fail('权限不足');
    if (!StringTool.isLengthInRange(feedbackCreateDto.body.title, 0, 30)) return Result.fail('标题长度不正确');
    if (!StringTool.isLengthInRange(feedbackCreateDto.body.content, 0, 255)) return Result.fail('内容长度不正确');
    if (!StringTool.isLengthInRange(feedbackCreateDto.body.image, 0, 16000000)) return Result.fail('图片大小不正确');

    return await this.feedbackService.create(feedbackCreateDto);
  }
}
