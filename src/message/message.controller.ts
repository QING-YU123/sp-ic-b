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

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }
  
  @Post('create')
  async create(@Body() messageCreateDto: MessageCreateDto) { 
    if (!NumberTool.isInteger(messageCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(messageCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(messageCreateDto.body.uid)) return Result.fail(MsgConst.uidNotExistE);
    if (!StringTool.isLengthInRange(messageCreateDto.body.title, 0, 30)) return Result.fail(MsgConst.contentLengthE);
    if (!StringTool.isLengthInRange(messageCreateDto.body.content, 0, 255)) return Result.fail(MsgConst.contentLengthE);
    

    return this.messageService.create(messageCreateDto);
  }

  @Post('query')
  async query(@Body() messageQueryDto: MessageQueryDto) {
    if(!NumberTool.isInteger(messageQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if(!ObjectTool.isBodyExist(messageQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(messageQueryDto.body.pageIndex)) return Result.fail(MsgConst.uidNotExistE);
    if (!NumberTool.isIntegerInRange(messageQueryDto.body.pageSize, 1, 100)) return Result.fail(MsgConst.pageSizeE);

    return this.messageService.query(messageQueryDto);
  }

  @Post('read')
  async read(@Body() messageReadDto: MessageReadDto) { 
    if (!NumberTool.isInteger(messageReadDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(messageReadDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(messageReadDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return this.messageService.read(messageReadDto);
  }
}
