import { Body, Controller, Post } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerQueryDto } from './dtos/power.query.dto';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';

/**
 * 鉴权模块控制层
 */
@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) { }
  
  /**
   * 超管查询权限
   * 
   * @param powerQueryDto 权限查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() powerQueryDto: PowerQueryDto) { 
    if (!Number.isInteger(powerQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);

    return await this.powerService.query(powerQueryDto);
  }
}
