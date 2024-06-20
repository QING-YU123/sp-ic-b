import { Body, Controller, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityCreateDto } from './dtos/activity.create.dto';
import { NumberTool } from 'src/.tools/number.tool';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { ObjectTool } from 'src/.tools/object.tool';
import { StringTool } from 'src/.tools/string.tool';
import { NumConst } from 'src/.const/num.const';
import { ActivityDeleteDto } from './dtos/activity.delete.dto';
import { ActivityUpdateDto } from './dtos/activity.update.dto';
import { ActivityQueryDto } from './dtos/activity.query.dto';
import { TimeTool } from 'src/.tools/time.tool';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }
  
  @Post('create')
  async create(@Body() activityCreateDto: ActivityCreateDto) { 
    if (!NumberTool.isInteger(activityCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(activityCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(activityCreateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(activityCreateDto.body.coverImg, 0, NumConst.imageMax))
      return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(activityCreateDto.body.introduction, 0, 255)) return Result.fail(MsgConst.contentLengthE);
    if (!StringTool.isLengthInRange(activityCreateDto.body.tag, 0, 50)) return Result.fail(MsgConst.tagLengthE);
    if (!NumberTool.isIntegerInRange(activityCreateDto.body.type,0,5)) return Result.fail(MsgConst.typeE);
    if (!TimeTool.isExist(activityCreateDto.body.startTime)) return Result.fail(MsgConst.startTimeE);
    if (!TimeTool.isExist(activityCreateDto.body.endTime)) return Result.fail(MsgConst.endTimeE);
    if (activityCreateDto.body.startTime >= activityCreateDto.body.endTime) return Result.fail(MsgConst.endTimeE);

    return  await this.activityService.create(activityCreateDto);
  }

  @Post('delete')
  async delete(@Body() activityDeleteDto: ActivityDeleteDto) { 
    if (!NumberTool.isInteger(activityDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(activityDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(activityDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.activityService.delete(activityDeleteDto);
  }

  @Post('update')
  async update(@Body() activityUpdateDto: ActivityUpdateDto) { 
    if (!NumberTool.isInteger(activityUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(activityUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(activityUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(activityUpdateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(activityUpdateDto.body.coverImg, 0, NumConst.imageMax))
      return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(activityUpdateDto.body.introduction, 0, 255)) return Result.fail(MsgConst.contentLengthE);
    if (!StringTool.isLengthInRange(activityUpdateDto.body.tag, 0, 50)) return Result.fail(MsgConst.tagLengthE);
    if (!TimeTool.isExist(activityUpdateDto.body.startTime)) return Result.fail(MsgConst.startTimeE);
    if (!TimeTool.isExist(activityUpdateDto.body.endTime)) return Result.fail(MsgConst.endTimeE);
    if (activityUpdateDto.body.startTime >= activityUpdateDto.body.endTime) return Result.fail(MsgConst.endTimeE);
    if (!NumberTool.isIntegerInRange(activityUpdateDto.body.type,0,5)) return Result.fail(MsgConst.typeE);
    if (!NumberTool.isIntegerInRange(activityUpdateDto.body.status,0,4)) return Result.fail(MsgConst.statusE);

    return await this.activityService.update(activityUpdateDto);
  }

  @Post('query')
  async query(@Body() activityQueryDto: ActivityQueryDto) { 
    if (!NumberTool.isInteger(activityQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(activityQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(activityQueryDto.body.pageIndex)) return Result.fail(MsgConst.pageIndexE);
    if (!NumberTool.isIntegerInRange(activityQueryDto.body.pageSize,0,100)) return Result.fail(MsgConst.pageSizeE);

    return await this.activityService.query(activityQueryDto);
  }
}
