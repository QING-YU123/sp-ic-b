import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageCreateDto } from './dtos/message.create.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { ObjectTool } from 'src/.tools/object.tool';
import { StringTool } from 'src/.tools/string.tool';
import { MessageQueryDto } from './dtos/message.query.dto';
import { MessageReadDto } from './dtos/message.read.dto';
import { NumConst } from 'src/.const/num.const';

/**
 * 消息模块控制层
 */
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }
  
  /**
   * 创建消息
   * 
   * @param messageCreateDto 消息创建DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() messageCreateDto: MessageCreateDto) { 
    if (!NumberTool.isInteger(messageCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(messageCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(messageCreateDto.body.uid)) return Result.fail(MsgConst.uidNotExistE);
    if (!StringTool.isLengthInRange(messageCreateDto.body.title, 0, 30)) return Result.fail(MsgConst.contentLengthE);
    if (!StringTool.isLengthInRange(messageCreateDto.body.content, 0, 255)) return Result.fail(MsgConst.contentLengthE);

    return this.messageService.create(messageCreateDto);
  }

  /**
   * 查询消息
   * 用户可以查询自己收到的消息，管理员可以查询所有消息
   * 
   * @param messageQueryDto 消息查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() messageQueryDto: MessageQueryDto) {
    if(!NumberTool.isInteger(messageQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if(!ObjectTool.isBodyExist(messageQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(messageQueryDto.body.pageIndex, 1, NumConst.pageIndexMax))
      return Result.fail(MsgConst.uidNotExistE);
    if (!NumberTool.isIntegerInRange(messageQueryDto.body.pageSize, 1, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);

    return this.messageService.query(messageQueryDto);
  }

  /**
   * 阅读消息
   * 接收消息的一方点开消息后访问此接口
   * 
   * @param messageReadDto 消息阅读DTO
   * @returns Result
   */
  @Post('read')
  async read(@Body() messageReadDto: MessageReadDto) { 
    if (!NumberTool.isInteger(messageReadDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(messageReadDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(messageReadDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return this.messageService.read(messageReadDto);
  }
}
