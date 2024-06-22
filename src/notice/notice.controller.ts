import { Body, Controller, Post } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { StringTool } from 'src/.tools/string.tool';
import { NoticeCreateDto } from './dtos/notice.create.dto';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { NoticeDeleteDto } from './dtos/notice.delete.dto';
import { NoticeUpdateDto } from './dtos/notice.update.dto';
import { NoticeQueryDto } from './dtos/notice.query.dto';
import { NumConst } from 'src/.const/num.const';
import { NoticeReadDto } from './dtos/notice.read.dto';

/**
 * 通知公告模块
 */
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) { }
  
  /**
   * 创建通知公告
   * 仅限具有管理通知权限用户访问
   * 
   * @param noticeCreateDto 通知公告创建DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() noticeCreateDto: NoticeCreateDto) {
    if (!NumberTool.isInteger(noticeCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(noticeCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(noticeCreateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(noticeCreateDto.body.content, 0, 2000)) return Result.fail(MsgConst.contentLengthE);
    if (!NumberTool.isInteger(noticeCreateDto.body.type)) return Result.fail(MsgConst.typeE);

    return this.noticeService.create(noticeCreateDto);
  }

  /**
   * 删除通知公告
   * 仅限具有管理通知权限用户访问
   * 
   * @param noticeDeleteDto 通知公告删除DTO
   * @returns Result
   */
  @Post('delete')
  async delete(@Body() noticeDeleteDto: NoticeDeleteDto) { 
    if (!NumberTool.isInteger(noticeDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(noticeDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(noticeDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return this.noticeService.delete(noticeDeleteDto);
  }

  /**
   * 更新通知公告
   * 仅限具有管理通知权限用户访问
   * 
   * @param noticeUpdateDto 通知公告更新DTO
   * @returns Result
   */
  @Post('update')
  async update(@Body() noticeUpdateDto: NoticeUpdateDto) { 
    if (!NumberTool.isInteger(noticeUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(noticeUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(noticeUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(noticeUpdateDto.body.title, 0, 30)) return Result.fail(MsgConst.titleLengthE);
    if (!StringTool.isLengthInRange(noticeUpdateDto.body.content, 0, 2000)) return Result.fail(MsgConst.contentLengthE);
    if (!NumberTool.isInteger(noticeUpdateDto.body.status)) return Result.fail(MsgConst.statusE);

    return this.noticeService.update(noticeUpdateDto);
  }

  /**
   * 查询通知公告
   * 通知管理员可以查看被隐藏的通知
   * 
   * @param noticeQueryDto 通知公告查询DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() noticeQueryDto: NoticeQueryDto) { 
    if (!NumberTool.isInteger(noticeQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(noticeQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(noticeQueryDto.body.pageSize, 1, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(noticeQueryDto.body.pageIndex, 1, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);

    return this.noticeService.query(noticeQueryDto);
  }

  /**
   * 阅读通知公告
   * 每访问一次，阅读数就会+1
   * 
   * @param noticeReadDto 通知公告阅读DTO
   * @returns Result
   */
  @Post('read')
  async read(@Body() noticeReadDto: NoticeReadDto) { 
    if (!NumberTool.isInteger(noticeReadDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(noticeReadDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(noticeReadDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return this.noticeService.read(noticeReadDto);
  }
}
