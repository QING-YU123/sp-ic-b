import { Body, Controller, Post } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsCreateDto } from './dtos/goods.create.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { StringTool } from 'src/.tools/string.tool';
import { NumConst } from 'src/.const/num.const';
import { GoodsDeleteDto } from './dtos/goods.delete.dto';
import { GoodsUpdateDto } from './dtos/goods.update.dto';
import { ObjectTool } from 'src/.tools/object.tool';
import { GoodsQueryDto } from './dtos/goods.query.dto';
import { GoodsBuyDto } from './dtos/goods.buy.dto';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) { }
  
  @Post('create')
  async create(@Body() goodsCreateDto: GoodsCreateDto) {
    if (!NumberTool.isInteger(goodsCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(goodsCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(goodsCreateDto.body.name, 0, 30)) return Result.fail(MsgConst.nameLengthE);
    if (!StringTool.isLengthInRange(goodsCreateDto.body.coverImg, 0, NumConst.imageMax)) return Result.fail(MsgConst.imageSizeE);
    if (!StringTool.isLengthInRange(goodsCreateDto.body.introduction, 0, 255)) return Result.fail(MsgConst.introductionLengthE);
    if (!StringTool.isLengthInRange(goodsCreateDto.body.type, 0, 50)) return Result.fail(MsgConst.typeE);
    if (!NumberTool.isIntegerInRange(goodsCreateDto.body.balance, 0, NumConst.intMax)) return Result.fail(MsgConst.balanceRangeE);
    if (!NumberTool.isIntegerInRange(goodsCreateDto.body.price, 0, NumConst.intMax)) return Result.fail(MsgConst.priceRangeE);

    return this.goodsService.create(goodsCreateDto);
  }

  @Post('delete')
  async delete(@Body() goodsDeleteDto: GoodsDeleteDto) {
    if (!NumberTool.isInteger(goodsDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(goodsDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(goodsDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return this.goodsService.delete(goodsDeleteDto);
  }

  @Post('update')
  async update(@Body() goodsUpdateDto: GoodsUpdateDto) {
    if (!NumberTool.isInteger(goodsUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(goodsUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(goodsUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!NumberTool.isInteger(goodsUpdateDto.body.sid)) return Result.fail(MsgConst.idNotExistE);
  if (!StringTool.isLengthInRange(goodsUpdateDto.body.name, 0, 30)) return Result.fail(MsgConst.nameLengthE);
    if (!StringTool.isLengthInRange(goodsUpdateDto.body.coverImg, 0, NumConst.imageMax)) return Result.fail(MsgConst.imageSizeE);
    if (!StringTool.isLengthInRange(goodsUpdateDto.body.introduction, 0, 255)) return Result.fail(MsgConst.introductionLengthE);
    if (!StringTool.isLengthInRange(goodsUpdateDto.body.type, 0, 50)) return Result.fail(MsgConst.typeE);
    if (!NumberTool.isIntegerInRange(goodsUpdateDto.body.balance, 0, NumConst.intMax)) return Result.fail(MsgConst.balanceRangeE);
    if (!NumberTool.isIntegerInRange(goodsUpdateDto.body.price, 0, NumConst.intMax)) return Result.fail(MsgConst.priceRangeE);

    return this.goodsService.update(goodsUpdateDto);
  }

  @Post('query')
  async query(@Body() goodsQueryDto: GoodsQueryDto) {
    if (!NumberTool.isInteger(goodsQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(goodsQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(goodsQueryDto.body.pageSize, 1, 100)) return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isInteger(goodsQueryDto.body.pageIndex)) return Result.fail(MsgConst.pageIndexE);

    return this.goodsService.query(goodsQueryDto);
  }

  @Post('buy')
  async buy(@Body() goodsBuyDto: GoodsBuyDto) { 
    if (!NumberTool.isInteger(goodsBuyDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(goodsBuyDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(goodsBuyDto.body.gid)) return Result.fail(MsgConst.idNotExistE);
    if (!NumberTool.isIntegerInRange(goodsBuyDto.body.num, 0, NumConst.intMax)) return Result.fail(MsgConst.numRangeE);

    return this.goodsService.buy(goodsBuyDto);
  }
}
