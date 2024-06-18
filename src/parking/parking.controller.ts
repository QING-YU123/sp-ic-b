import { Body, Controller, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingCreateDto } from './dtos/parking.create.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { ParkingDeleteDto } from './dtos/parking.delete.dto';
import { ParkingUpdateDto } from './dtos/parking.update.dto';
import { StringTool } from 'src/.tools/string.tool';
import { ParkingQueryDto } from './dtos/parking.query.dto';
import { NumConst } from 'src/.const/num.const';
import { ObjectTool } from 'src/.tools/object.tool';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) { }
  
  @Post('create')
  async create(@Body() parkingCreateDto: ParkingCreateDto) {
    if (!NumberTool.isInteger(parkingCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(parkingCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(parkingCreateDto.body.id, 1, NumConst.intMax)) return Result.fail(MsgConst.idRangeE);
    if (!NumberTool.isIntegerInRange(parkingCreateDto.body.price, 0, NumConst.intMax))
      return Result.fail(MsgConst.priceRangeE);
    
    return await this.parkingService.create(parkingCreateDto);
  }

  @Post('delete')
  async delete(@Body() parkingDeleteDto: ParkingDeleteDto) {
    if (!NumberTool.isInteger(parkingDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(parkingDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(parkingDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.parkingService.delete(parkingDeleteDto);
  }

  @Post('update')
  async update(@Body() parkingUpdateDto: ParkingUpdateDto) { 
    if (!NumberTool.isInteger(parkingUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(parkingUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(parkingUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(parkingUpdateDto.body.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!NumberTool.isIntegerInRange(parkingUpdateDto.body.price, 0, NumConst.intMax))
      return Result.fail(MsgConst.priceRangeE);
    if (!StringTool.isLengthInRange(parkingUpdateDto.body.carNum, 0, 7)) return Result.fail(MsgConst.carNumLengthE);

    return await this.parkingService.update(parkingUpdateDto);
  }

  @Post('query')
  async query(@Body() parkingQueryDto: ParkingQueryDto) { 
    if (!NumberTool.isInteger(parkingQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(parkingQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(parkingQueryDto.body.pageSize, 1, 100)) return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isInteger(parkingQueryDto.body.pageIndex)) return Result.fail(MsgConst.pageIndexE);

    return await this.parkingService.query(parkingQueryDto);
  }
}
