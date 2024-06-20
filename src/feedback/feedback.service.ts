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
import { MsgConst } from 'src/.const/msg.const';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FeedbackService {
  static repository: Repository<Feedback>;
  constructor(@InjectRepository(Feedback) repository: Repository<Feedback>) { 
    FeedbackService.repository = repository;
  }

  /**
   * 反馈创建业务逻辑处理
   * 
   * @param feedbackCreateDto 反馈创建数据传输对象
   * @returns Result
   */
  async create(feedbackCreateDto: FeedbackCreateDto) {
    if (!(await PowerService.get(feedbackCreateDto)).uFeedback) return Result.fail(MsgConst.powerLowE);

    feedbackCreateDto.body.uid = feedbackCreateDto.checkingUid;
    const res = FeedbackService.repository.save(feedbackCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.feedback.create);
  }

  /**
   * 反馈删除业务逻辑处理
   * 
   * @param feedbackDeleteDto 反馈删除数据传输对象
   * @returns Result
   */
  async delete(feedbackDeleteDto: FeedbackDeleteDto) {
    if (!(await PowerService.get(feedbackDeleteDto)).mFeedback) return Result.fail(MsgConst.powerLowE);
    
    const res = await FeedbackService.repository.update(feedbackDeleteDto.body.id, {status: 1});

    return Result.isOrNot(res.affected != 0, MsgConst.feedback.delete);
  }

  /**
   * 反馈更新业务逻辑处理
   * 
   * @param feedbackUpdateDto 反馈更新数据传输对象
   * @returns Result
   */
  async update(feedbackUpdateDto: FeedbackUpdateDto) {
    if (!(await PowerService.get(feedbackUpdateDto)).uFeedback) return Result.fail(MsgConst.powerLowE);

    const res = await FeedbackService.repository.update(feedbackUpdateDto.body.id,
      { result: feedbackUpdateDto.body.result, status: 2 });

    return Result.isOrNot(res.affected != 0, MsgConst.feedback.update);
  }

  /**
   * 反馈查询业务逻辑处理
   * 
   * @param feedbackQueryDto 反馈查询数据传输对象
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
        status: In(power.mFeedback? [0, 2] : [0]),
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
    });
    
    return Result.success(MsgConst.feedback.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
