import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { OutsiderService } from 'src/outsider/outsider.service';
import { UserCreateDto } from './dtos/user.create.dto';
import { Result } from 'src/.dtos/result';
import { NumberTool } from 'src/.tools/number.tool';
import { StringTool } from 'src/.tools/string.tool';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  async create(@Body() userCreateDto: UserCreateDto) { 
    if (!NumberTool.isInteger(userCreateDto.checkingUid)) return Result.fail('权限不足');
    if (!StringTool.isLengthInRange(userCreateDto.body.phone, 11, 11)) return Result.fail('手机号长度不正确');
    if (!StringTool.isLengthInRange(userCreateDto.body.password, 6, 16)) return Result.fail('密码长度不正确');
    if (!NumberTool.isIntegerInRange(userCreateDto.body.power, 1, 9)) return Result.fail('权限不正确');
    if (!StringTool.isLengthInRange(userCreateDto.body.username, 1, 20)) return Result.fail('用户名长度不正确');
  }
  
  
  @Post('query')
  async query() { 
    //return await OutsiderService.repository.find();

    //return await this.userService.query();
  }
}
