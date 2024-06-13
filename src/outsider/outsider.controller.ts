import { Body, Controller, Post } from '@nestjs/common';
import { Result } from './../.dtos/result';
import { NumberTool } from './../.tools/number.tool';
import { StringTool } from './../.tools/string.tool';
import { OutsiderCreateDto } from './dtos/outsider.create.dto';
import { OutsiderService } from './outsider.service';

@Controller('outsider')
export class OutsiderController {
  constructor(private readonly outsiderService: OutsiderService) {}
  
  @Post('create')
  async create(@Body() outsiderCreateDto: OutsiderCreateDto) { 
    if (!NumberTool.isInteger(outsiderCreateDto.checkingUid.toString())) return Result.fail('权限不足');
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.phone, 11, 11)) return Result.fail('手机号长度不正确');
    if (!NumberTool.isIntegerInRange(outsiderCreateDto.body.sex, 0, 1)) return Result.fail('性别不正确');
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.name, 1, 10)) return Result.fail('姓名长度不正确');
    if (!StringTool.isLengthInRange(outsiderCreateDto.body.address, 1, 255)) return Result.fail('地址长度不正确');

    return await this.outsiderService.create(outsiderCreateDto);
  }

  @Post('delete')
  async delete() {
    return Result.success();
  }

  @Post('update')
  async update() { 
    return Result.success();
  }

  @Post('query')
  async query() { 
    return Result.success();
  }
}
