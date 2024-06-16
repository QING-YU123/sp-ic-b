import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackCreateDto } from './dtos/feedback.create.dto';
import { FeedbackDeleteDto } from './dtos/feedback.delete.dto';
import { NumberTool } from './../.tools/number.tool';
import { Result } from './../.dtos/result';
import { StringTool } from './../.tools/string.tool';
import { FeedbackUpdateDto } from './dtos/feedback.update.dto';
import { FeedbackQueryDto } from './dtos/feedback.query.dto';

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

  @Post('delete')
  async delete(@Body() feedbackDeleteDto: FeedbackDeleteDto) {
    if (!NumberTool.isInteger(feedbackDeleteDto.checkingUid)) return Result.fail('权限不足');
    if (!NumberTool.isInteger(feedbackDeleteDto.body.id)) return Result.fail('该id不存在');

    return await this.feedbackService.delete(feedbackDeleteDto);
  }

  @Post('update')
  async update(@Body() feedbackUpdateDto: FeedbackUpdateDto) { 
    if (!NumberTool.isInteger(feedbackUpdateDto.checkingUid)) return Result.fail('权限不足');
    if (!NumberTool.isInteger(feedbackUpdateDto.body.id)) return Result.fail('该id不存在');
    if (!StringTool.isLengthInRange(feedbackUpdateDto.body.result, 0, 255)) return Result.fail('处理结果长度不正确');

    return await this.feedbackService.update(feedbackUpdateDto);
  }

  @Post('query')
  async query(@Body() feedbackQueryDto: FeedbackQueryDto) { 
    if (!NumberTool.isInteger(feedbackQueryDto.checkingUid)) return Result.fail('权限不足');
    if (!NumberTool.isIntegerInRange(feedbackQueryDto.body.pageSize, 1, 100)) return Result.fail('pageSize不正确');
    if (!NumberTool.isInteger(feedbackQueryDto.body.pageIndex)) return Result.fail('pageIndex不正确');

    return await this.feedbackService.query(feedbackQueryDto);
  }
}
