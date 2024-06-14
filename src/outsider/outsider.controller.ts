import { Body, Controller, Get, Post } from '@nestjs/common';
import { Result } from './../.dtos/result';
import { NumberTool } from './../.tools/number.tool';
import { StringTool } from './../.tools/string.tool';
import { OutsiderCreateDto } from './dtos/outsider.create.dto';
import { OutsiderService } from './outsider.service';
import { OutsiderDeleteDto } from './dtos/outsider.delete.dto';
import { OutsiderUpdateDto } from './dtos/outsider.update.dto';
import { OutsiderQueryDto } from './dtos/outsider.query.dto';

@Controller('outsider')
export class OutsiderController {
  constructor(private readonly outsiderService: OutsiderService) { }
  
  @Post('create')
  async create(@Body() outsiderCreateDto: OutsiderCreateDto) { 
    if (!NumberTool.isInteger(outsiderCreateDto.checkingUid)) return Result.fail('权限不足');
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.phone, 11, 11)) return Result.fail('手机号长度不正确');
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.gender, 1, 1)) return Result.fail('性别不正确');
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.name, 1, 10)) return Result.fail('姓名长度不正确');
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.address, 1, 255)) return Result.fail('地址长度不正确');

    return await this.outsiderService.create(outsiderCreateDto);
  }

  @Post('delete')
  async delete(@Body() outsiderDeleteDto: OutsiderDeleteDto) {
    if (!NumberTool.isInteger(outsiderDeleteDto.checkingUid)) return Result.fail('权限不足');
    if (!NumberTool.isInteger(outsiderDeleteDto.body.id)) return Result.fail('该id不存在');

    return await this.outsiderService.delete(outsiderDeleteDto);
  }

  @Post('update')
  async update(@Body() outsiderUpdateDto: OutsiderUpdateDto) { 
    if (!NumberTool.isInteger(outsiderUpdateDto.checkingUid)) return Result.fail('权限不足');
    if (!NumberTool.isInteger(outsiderUpdateDto.body.id)) return Result.fail('该id不存在');
    if (!StringTool.isLengthInRange(outsiderUpdateDto.body.phone, 11, 11)) return Result.fail('手机号长度不正确');
    if (!StringTool.isLengthInRange(outsiderUpdateDto.body.gender, 1, 1)) return Result.fail('性别不正确');
    if (!StringTool.isLengthInRange(outsiderUpdateDto.body.name, 1, 10)) return Result.fail('姓名长度不正确');
    if (!StringTool.isLengthInRange(outsiderUpdateDto.body.address, 1, 255)) return Result.fail('地址长度不正确');

    return await this.outsiderService.update(outsiderUpdateDto);
  }

  @Post('query')
  async query(@Body() outsiderQueryDto: OutsiderQueryDto) { 
    if (!NumberTool.isInteger(outsiderQueryDto.checkingUid)) return Result.fail('权限不足');
    if (!NumberTool.isInteger(outsiderQueryDto.body.pageSize)) return Result.fail('pageSize不正确');
    if (!NumberTool.isInteger(outsiderQueryDto.body.pageIndex)) return Result.fail('pageIndex不正确');

    return await this.outsiderService.query(outsiderQueryDto);
  }
}
