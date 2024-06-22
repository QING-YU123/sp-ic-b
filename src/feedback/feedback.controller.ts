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

/**
 * 反馈建议模块控制层
 */
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }
  
  /**
   * 创建反馈建议
   * 用户创建反馈建议
   * 
   * @param feedbackCreateDto 反馈建议创建DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() feedbackCreateDto: FeedbackCreateDto) {
    if (!NumberTool.isInteger(feedbackCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(feedbackCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(feedbackCreateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(feedbackCreateDto.body.content, 0, 255)) return Result.fail(MsgConst.contentLengthE);
    if (!StringTool.isLengthInRange(feedbackCreateDto.body.image, 0, NumConst.imageMax))
      return Result.fail(MsgConst.imageSizeE);

    return await this.feedbackService.create(feedbackCreateDto);
  }

  /**
   * 删除反馈建议
   * 仅限反馈建议管理员访问
   * 
   * @param feedbackDeleteDto 反馈建议删除DTO
   * @returns Result
   */
  @Post('delete')
  async delete(@Body() feedbackDeleteDto: FeedbackDeleteDto) {
    if (!NumberTool.isInteger(feedbackDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(feedbackDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(feedbackDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.feedbackService.delete(feedbackDeleteDto);
  }

  /**
   * 处理反馈建议
   * 仅限反馈建议管理员访问
   * 仅上传处理结果
   * 
   * @param feedbackUpdateDto 反馈建议更新DTO
   * @returns Result
   */
  @Post('update')
  async update(@Body() feedbackUpdateDto: FeedbackUpdateDto) { 
    if (!NumberTool.isInteger(feedbackUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(feedbackUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(feedbackUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(feedbackUpdateDto.body.result, 0, 255)) return Result.fail(MsgConst.resultLengthE);

    return await this.feedbackService.update(feedbackUpdateDto);
  }

  /**
   * 查询反馈建议
   * 用户仅可查询自己创建的反馈建议，管理员可查询所有反馈建议
   * 
   * @param feedbackQueryDto 反馈建议查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() feedbackQueryDto: FeedbackQueryDto) { 
    if (!NumberTool.isInteger(feedbackQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(feedbackQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(feedbackQueryDto.body.pageSize, 1, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(feedbackQueryDto.body.pageIndex, 1, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);

    return await this.feedbackService.query(feedbackQueryDto);
  }
}
