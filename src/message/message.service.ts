import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { MessageCreateDto } from './dtos/message.create.dto';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { PowerService } from 'src/power/power.service';
import { MessageQueryDto } from './dtos/message.query.dto';
import { MessageReadDto } from './dtos/message.read.dto';
import { UserService } from 'src/user/user.service';

/**
 * 消息模块服务层
 */
@Injectable()
export class MessageService {
  /**
   * 消息模块数据层
   */
  static repository: Repository<Message>;
  constructor(@InjectRepository(Message) repository: Repository<Message>) {
    MessageService.repository = repository;
  }

  /** 
   * 消息创建业务逻辑处理
   * 
   * @param messageCreateDto 消息创建DTO
   * @returns Result
   */
  async create(messageCreateDto: MessageCreateDto) {
    const power1 = await UserService.repository.findOne({ select: ['power'],where: { id: messageCreateDto.checkingUid } });
    if (power1.power == 3) return Result.fail(MsgConst.powerLowE);

    messageCreateDto.body.fromUid = messageCreateDto.checkingUid;
    const res = await MessageService.repository.save(messageCreateDto.body);

    return Result.isOrNot(res!= null, MsgConst.message.create);
  }

  /** 
   * 消息查询业务逻辑处理
   * 
   * @param messageQueryDto 消息查询DTO
   * @returns Result
   */
  async query(messageQueryDto: MessageQueryDto) {
    const power = await PowerService.get(messageQueryDto);

    const [data, total] = await MessageService.repository.findAndCount({
      skip: (messageQueryDto.body.pageIndex - 1) * messageQueryDto.body.pageSize,
      take: messageQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      where: {
        uid: power.mAdmin1 ? null : messageQueryDto.checkingUid
      }
    });
   
    return Result.success(MsgConst.message.query + MsgConst.success, {
      data : data,
      total : total
    });
  }


  /** 
   * 消息已读业务逻辑处理
   * 
   * @param messageReadDto 消息已读DTO
   * @returns Result
   */
  async read(messageReadDto: MessageReadDto) {
    const uid = await MessageService.repository.findOne({ select: ['uid'],where: { id: messageReadDto.body.id } });
    if (messageReadDto.checkingUid != uid.uid) return Result.fail(MsgConst.readNotHimselfE);

    const res = await MessageService.repository.update(messageReadDto.body.id, { read: true });

    return Result.isOrNot(res.affected != 0, MsgConst.message.read);
  }
}
