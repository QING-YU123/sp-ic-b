import { Body, Controller, Post } from '@nestjs/common';
import { LogService } from './log.service';
import { LogQueryDto } from './dtos/log.query.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { TimeTool } from 'src/.tools/time.tool';
import { StringTool } from 'src/.tools/string.tool';
import { LogCreateDto } from './dtos/log.create.dto';
import { NumConst } from 'src/.const/num.const';

/**
 * 日志模块控制层
 */
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) { }

  /**
   * 日志创建
   * 仅限管理员使用
   * 
   * @param logCreateDto 日志创建DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() logCreateDto: LogCreateDto) { 
    if (!NumberTool.isInteger(logCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(logCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(logCreateDto.body.type, 0, 2)) return Result.fail(MsgConst.typeE);
    if (!StringTool.isLengthInRange(logCreateDto.body.content, 1, 200)) return Result.fail(MsgConst.contentLengthE);
    
    return await this.logService.create(logCreateDto);
  }
  
  /**
   * 日志查询
   * 仅限管理员使用
   * 
   * @param logQueryDto 日志查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() logQueryDto: LogQueryDto) { 
    if (!NumberTool.isInteger(logQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(logQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(logQueryDto.body.pageSize, 1, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(logQueryDto.body.pageIndex, 1, NumConst.pageIndexMax)) 
      return Result.fail(MsgConst.pageIndexE);
    if (logQueryDto.body.type != null) {
      if (!NumberTool.isIntegerInRange(logQueryDto.body.type, 0, 2)) return Result.fail(MsgConst.typeE);
    }
    if (!TimeTool.isExist(logQueryDto.body.date)) return Result.fail(MsgConst.dateE);

    return await this.logService.query(logQueryDto);
  }
}
