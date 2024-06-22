import { Body, Controller, Post } from '@nestjs/common';
import { MsgConst } from 'src/.const/msg.const';
import { NumConst } from 'src/.const/num.const';
import { Result } from 'src/.dtos/result';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { StringTool } from 'src/.tools/string.tool';
import { TimeTool } from 'src/.tools/time.tool';
import { ActivityService } from './activity.service';
import { ActivityCreateDto } from './dtos/activity.create.dto';
import { ActivityDeleteDto } from './dtos/activity.delete.dto';
import { ActivityQueryDto } from './dtos/activity.query.dto';
import { ActivityUpdateDto } from './dtos/activity.update.dto';

/**
 * 活动模块控制层
 */
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }
  
  /**
   * 创建活动
   * 仅限有管理活动权限的用户访问
   * 
   * @param activityCreateDto 活动创建DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() activityCreateDto: ActivityCreateDto) { 
    if (!NumberTool.isInteger(activityCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(activityCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(activityCreateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(activityCreateDto.body.coverImg, 0, NumConst.imageMax))
      return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(activityCreateDto.body.introduction, 0, 255)) return Result.fail(MsgConst.contentLengthE);
    if (!StringTool.isLengthInRange(activityCreateDto.body.tag, 0, 50)) return Result.fail(MsgConst.tagLengthE);
    if (!NumberTool.isIntegerInRange(activityCreateDto.body.type, 0, 5)) return Result.fail(MsgConst.typeE);
    if (!TimeTool.isExist(activityCreateDto.body.startTime)) return Result.fail(MsgConst.startTimeE);
    if (!TimeTool.isExist(activityCreateDto.body.endTime)) return Result.fail(MsgConst.endTimeE);
    if (activityCreateDto.body.startTime >= activityCreateDto.body.endTime) return Result.fail(MsgConst.endTimeE);

    return  await this.activityService.create(activityCreateDto);
  }

  /**
   * 删除活动
   * 仅限有管理活动权限的用户访问
   * 
   * @param activityDeleteDto 活动删除DTO
   * @returns Result
   */
  @Post('delete')
  async delete(@Body() activityDeleteDto: ActivityDeleteDto) { 
    if (!NumberTool.isInteger(activityDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(activityDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(activityDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.activityService.delete(activityDeleteDto);
  }

  /**
   * 更新活动
   * 仅限有管理活动权限的用户访问
   * 
   * @param activityUpdateDto 活动更新DTO
   * @returns Result
   */
  @Post('update')
  async update(@Body() activityUpdateDto: ActivityUpdateDto) { 
    if (!NumberTool.isInteger(activityUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(activityUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(activityUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(activityUpdateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(activityUpdateDto.body.coverImg, 0, NumConst.imageMax))
      return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(activityUpdateDto.body.introduction, 0, 500)) return Result.fail(MsgConst.contentLengthE);
    if (!StringTool.isLengthInRange(activityUpdateDto.body.tag, 0, 50)) return Result.fail(MsgConst.tagLengthE);
    if (!TimeTool.isExist(activityUpdateDto.body.startTime)) return Result.fail(MsgConst.startTimeE);
    if (!TimeTool.isExist(activityUpdateDto.body.endTime)) return Result.fail(MsgConst.endTimeE);
    if (activityUpdateDto.body.startTime >= activityUpdateDto.body.endTime) return Result.fail(MsgConst.endTimeE);
    if (!NumberTool.isIntegerInRange(activityUpdateDto.body.status, 0, 4)) return Result.fail(MsgConst.statusE);

    return await this.activityService.update(activityUpdateDto);
  }

  /**
   * 查询活动
   * 
   * @param activityQueryDto 活动查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() activityQueryDto: ActivityQueryDto) { 
    if (!NumberTool.isInteger(activityQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(activityQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(activityQueryDto.body.pageIndex, 0, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);
    if (!NumberTool.isIntegerInRange(activityQueryDto.body.pageSize, 0, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);

    return await this.activityService.query(activityQueryDto);
  }
}
