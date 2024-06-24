import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { PowerService } from 'src/power/power.service';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { FeedbackCreateDto } from './dtos/feedback.create.dto';
import { FeedbackDeleteDto } from './dtos/feedback.delete.dto';
import { FeedbackQueryDto } from './dtos/feedback.query.dto';
import { FeedbackUpdateDto } from './dtos/feedback.update.dto';
import { Feedback } from './entities/feedback.entity';
import { TimeTool } from 'src/.tools/time.tool';

/**
 * 反馈建议服务层
 */
@Injectable()
export class FeedbackService {
  /**
   * 反馈建议数据层
   */
  static repository: Repository<Feedback>;
  constructor(@InjectRepository(Feedback) repository: Repository<Feedback>) { 
    FeedbackService.repository = repository;
  }

  /**
   * 反馈建议创建业务逻辑处理
   * 
   * @param feedbackCreateDto 反馈建议创建DTO
   * @returns Result
   */
  async create(feedbackCreateDto: FeedbackCreateDto) {
    if (!(await PowerService.get(feedbackCreateDto)).uFeedback) return Result.fail(MsgConst.powerLowE);

    feedbackCreateDto.body.uid = feedbackCreateDto.checkingUid;
    const res = FeedbackService.repository.save(feedbackCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.feedback.create);
  }

  /**
   * 反馈建议删除业务逻辑处理
   * 
   * @param feedbackDeleteDto 反馈建议删除DTO
   * @returns Result
   */
  async delete(feedbackDeleteDto: FeedbackDeleteDto) {
    if (!(await PowerService.get(feedbackDeleteDto)).mFeedback) return Result.fail(MsgConst.powerLowE);
    
    const res = await FeedbackService.repository.update(feedbackDeleteDto.body.id, {status: 1});

    return Result.isOrNot(res.affected != 0, MsgConst.feedback.delete);
  }

  /**
   * 反馈建议更新业务逻辑处理
   * 
   * @param feedbackUpdateDto 反馈建议更新DTO
   * @returns Result
   */
  async update(feedbackUpdateDto: FeedbackUpdateDto) {
    if (!(await PowerService.get(feedbackUpdateDto)).uFeedback) return Result.fail(MsgConst.powerLowE);

    const res = await FeedbackService.repository.update(feedbackUpdateDto.body.id,
      { result: feedbackUpdateDto.body.result, status: 2 });

    return Result.isOrNot(res.affected != 0, MsgConst.feedback.update);
  }

  /**
   * 反馈建议查询业务逻辑处理
   * 
   * @param feedbackQueryDto 反馈建议查询DTO
   * @returns Result
   */
  async query(feedbackQueryDto: FeedbackQueryDto) {
    const power = await PowerService.get(feedbackQueryDto);
    if (!power.uFeedback) return Result.fail(MsgConst.powerLowE);
    
    const [data, total] = await FeedbackService.repository.findAndCount({
      skip: (feedbackQueryDto.body.pageIndex - 1) * feedbackQueryDto.body.pageSize,
      take: feedbackQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      where: {
        status: In([0, 2]),
        uid: power.mFeedback ? null : feedbackQueryDto.checkingUid
      }
    });
    const user = await UserService.repository.find({
      select: ["id", "name", "phone"],
      where: { id: In(data.map(item => item.uid)) }
    });
    let data1: any = data;
    data1.forEach(item => {
      const u = user.find(userItem => userItem.id === item.uid);
      item.name = u.name;
      item.phone = u.phone;
      item.image = item.image.toString();
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
    });
    
    return Result.success(MsgConst.feedback.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
