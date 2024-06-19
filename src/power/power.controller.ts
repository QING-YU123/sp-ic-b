import { Body, Controller, Post } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerQueryDto } from './dtos/power.query.dto';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) { }
  
  @Post('query')
  async query(@Body() powerQueryDto: PowerQueryDto) { 
    if (!Number.isInteger(powerQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);

    return await this.powerService.query(powerQueryDto);
  }
}
