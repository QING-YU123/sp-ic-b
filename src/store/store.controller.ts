import { Body, Controller, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreCreateDto } from './dtos/store.create.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { StringTool } from 'src/.tools/string.tool';
import { StoreUpdateDto } from './dtos/store.update.dto';
import { StoreDeleteDto } from './dtos/store.delete.dto';
import { StoreQueryDto } from './dtos/store.query.dto';
import { ObjectTool } from 'src/.tools/object.tool';
import { BooleanTool } from 'src/.tools/boolean.tool';
import { NumConst } from 'src/.const/num.const';
import { StoreTotalDto } from './dtos/store.total.dto';

/**
 * 店铺模块控制层
 */
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }
  
  /**
   * 创建店铺
   * 仅拥有商店老板权限的用户可创建
   * 
   * @param storeCreateDto 店铺创建DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() storeCreateDto: StoreCreateDto) {
    if (!NumberTool.isInteger(storeCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(storeCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(storeCreateDto.body.name, 0, 8)) return Result.fail(MsgConst.nameLengthE);
    if (!StringTool.isLengthInRange(storeCreateDto.body.coverImg, 0, NumConst.imageMax))
      return Result.fail(MsgConst.imageSizeE);
    if (!StringTool.isLengthInRange(storeCreateDto.body.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!StringTool.isLengthInRange(storeCreateDto.body.introduction, 0, 255))
      return Result.fail(MsgConst.introductionLengthE);
    if (!StringTool.isLengthInRange(storeCreateDto.body.address, 0, 50)) return Result.fail(MsgConst.addressLengthE);
    if (!NumberTool.isIntegerInRange(storeCreateDto.body.type, 0, 1)) return Result.fail(MsgConst.typeE);

    return await this.storeService.create(storeCreateDto);
  }

  /**
   * 删除店铺
   * 老板自己删除会将状态置为注销，店铺审核人员删除会将状态置为查封
   * 
   * @param storeDeleteDto 店铺删除DTO
   * @returns Result
   */
  @Post('delete')
  async delete(@Body() storeDeleteDto: StoreDeleteDto) {
    if (!NumberTool.isInteger(storeDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(storeDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(storeDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.storeService.delete(storeDeleteDto);
  }

  /**
   * 更新店铺
   * 
   * @param storeUpdateDto 店铺更新DTO
   * @returns Result
   */
  @Post('update')
  async update(@Body() storeUpdateDto: StoreUpdateDto) {
    if (!NumberTool.isInteger(storeUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(storeUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(storeUpdateDto.body.name, 0, 8)) return Result.fail(MsgConst.nameLengthE);
    if (!StringTool.isLengthInRange(storeUpdateDto.body.coverImg, 0, NumConst.imageMax))
      return Result.fail(MsgConst.imageSizeE);
    if (!StringTool.isLengthInRange(storeUpdateDto.body.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!StringTool.isLengthInRange(storeUpdateDto.body.introduction, 0, 255))
      return Result.fail(MsgConst.introductionLengthE);
    if (!StringTool.isLengthInRange(storeUpdateDto.body.address, 0, 50)) return Result.fail(MsgConst.addressLengthE);
    if (!NumberTool.isIntegerInRange(storeUpdateDto.body.status, 0, 3) && storeUpdateDto.body.status != 1 &&
      storeUpdateDto.body.status != 2)
      return Result.fail(MsgConst.statusE);
    
    return await this.storeService.update(storeUpdateDto);
  }

  /**
   * 查询店铺
   * myStore = true 查询自己的店铺，myStore = false 查询所有店铺
   * 
   * @param storeQueryDto 店铺查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() storeQueryDto: StoreQueryDto) {
    if (!NumberTool.isInteger(storeQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(storeQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(storeQueryDto.body.pageSize, 0, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(storeQueryDto.body.pageIndex, 0, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);
    if (!BooleanTool.isBoolean(storeQueryDto.body.myStore)) return Result.fail(MsgConst.booleanE);

    return await this.storeService.query(storeQueryDto);
  }

  /**
   * 老板统计商店消息
   * 
   * @param storeTotalDto 商店信息统计DTO
   * @returns Result
   */
  @Post('total')
  async total(@Body() storeTotalDto: StoreTotalDto) {
    if (!NumberTool.isInteger(storeTotalDto.checkingUid)) return Result.fail(MsgConst.powerLowE);

    return await this.storeService.total(storeTotalDto);
  }
}
