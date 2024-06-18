import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackCreateDto } from './dtos/feedback.create.dto';
import { FeedbackDeleteDto } from './dtos/feedback.delete.dto';
import { NumberTool } from './../.tools/number.tool';
import { Result } from './../.dtos/result';
import { StringTool } from './../.tools/string.tool';
import { FeedbackUpdateDto } from './dtos/feedback.update.dto';
import { FeedbackQueryDto } from './dtos/feedback.query.dto';
import { MsgConst } from 'src/.const/msg.const';
import { NumConst } from 'src/.const/num.const';
import { ObjectTool } from './../.tools/object.tool';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }
  
  @Post('create')
  async create(@Body() feedbackCreateDto: FeedbackCreateDto) {
    if (!NumberTool.isInteger(feedbackCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(feedbackCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(feedbackCreateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(feedbackCreateDto.body.content, 0, 255)) return Result.fail(MsgConst.contentLengthE);
    if (!StringTool.isLengthInRange(feedbackCreateDto.body.image, 0, NumConst.imageMax)) return Result.fail(MsgConst.imageSizeE);

    return await this.feedbackService.create(feedbackCreateDto);
  }

  @Post('delete')
  async delete(@Body() feedbackDeleteDto: FeedbackDeleteDto) {
    if (!NumberTool.isInteger(feedbackDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(feedbackDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(feedbackDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.feedbackService.delete(feedbackDeleteDto);
  }

  @Post('update')
  async update(@Body() feedbackUpdateDto: FeedbackUpdateDto) { 
    if (!NumberTool.isInteger(feedbackUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(feedbackUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(feedbackUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(feedbackUpdateDto.body.result, 0, 255)) return Result.fail(MsgConst.resultLengthE);

    return await this.feedbackService.update(feedbackUpdateDto);
  }

  @Post('query')
  async query(@Body() feedbackQueryDto: FeedbackQueryDto) { 
    if (!NumberTool.isInteger(feedbackQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(feedbackQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(feedbackQueryDto.body.pageSize, 1, 100)) return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isInteger(feedbackQueryDto.body.pageIndex)) return Result.fail(MsgConst.pageIndexE);

    return await this.feedbackService.query(feedbackQueryDto);
  }
}
