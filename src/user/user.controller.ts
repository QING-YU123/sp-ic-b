import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { OutsiderService } from 'src/outsider/outsider.service';
import { UserCreateDto } from './dtos/user.create.dto';
import { Result } from 'src/.dtos/result';
import { NumberTool } from 'src/.tools/number.tool';
import { StringTool } from 'src/.tools/string.tool';
import { UserDeleteDto } from './dtos/user.delete.dto';
import { UserUpdateDto } from './dtos/user.update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  async create(@Body() userCreateDto: UserCreateDto) { 
    if (!NumberTool.isInteger(userCreateDto.checkingUid)) return Result.fail('权限不足');
    if (!StringTool.isLengthInRange(userCreateDto.body.phone, 11, 11)) return Result.fail('手机号长度不正确');
    if (!StringTool.isLengthInRange(userCreateDto.body.password, 6, 16)) return Result.fail('密码长度不正确');
    if (!NumberTool.isIntegerInRange(userCreateDto.body.power, 2, 9)) return Result.fail('分配权限不正确');
    if (userCreateDto.body.power == 4) return Result.fail('分配权限不正确');
    if (!StringTool.isLengthInRange(userCreateDto.body.username, 1, 20)) return Result.fail('用户名长度不正确');
    if (!StringTool.isLengthInRange(userCreateDto.body.gender, 1, 1)) return Result.fail('性别长度不正确');
    if (!StringTool.isLengthInRange(userCreateDto.body.introduction, 0, 255)) return Result.fail('简介长度不正确');
    if (!StringTool.isLengthInRange(userCreateDto.body.name, 1, 10)) return Result.fail('姓名长度不正确');
    if (!StringTool.isLengthInRange(userCreateDto.body.idCard, 18, 18)) return Result.fail('身份证号长度不正确');
    if (!StringTool.isLengthInRange(userCreateDto.body.address, 1, 255)) return Result.fail('地址长度不正确');
    
    return await this.userService.create(userCreateDto);
  }
  
  @Post('delete')
  async delete(@Body() userDeleteDto: UserDeleteDto) { 
    if (!NumberTool.isInteger(userDeleteDto.checkingUid)) return Result.fail('权限不足');
    if (!NumberTool.isInteger(userDeleteDto.body.id)) return Result.fail('用户id不正确');

    return await this.userService.delete(userDeleteDto);
  }

  @Post('update')
  async update(@Body() userUpdateDto: UserUpdateDto) { 
    if (!NumberTool.isInteger(userUpdateDto.checkingUid)) return Result.fail('权限不足');
    if (!NumberTool.isInteger(userUpdateDto.body.id)) return Result.fail('用户id不正确');
    if (!StringTool.isLengthInRange(userUpdateDto.body.phone, 11, 11)) return Result.fail('手机号长度不正确');
    if (!NumberTool.isIntegerInRange(userUpdateDto.body.power, 2, 9)) return Result.fail('分配权限不正确');
    if (userUpdateDto.body.power == 4) return Result.fail('分配权限不正确');
    if (!StringTool.isLengthInRange(userUpdateDto.body.username, 1, 20)) return Result.fail('用户名长度不正确');
    if (!StringTool.isLengthInRange(userUpdateDto.body.gender, 1, 1)) return Result.fail('性别长度不正确');
    if (!StringTool.isLengthInRange(userUpdateDto.body.introduction, 0, 255)) return Result.fail('简介长度不正确');
    if (!StringTool.isLengthInRange(userUpdateDto.body.name, 1, 10)) return Result.fail('姓名长度不正确');
    if (!StringTool.isLengthInRange(userUpdateDto.body.idCard, 18, 18)) return Result.fail('身份证号长度不正确');
    if (!StringTool.isLengthInRange(userUpdateDto.body.address, 1, 255)) return Result.fail('地址长度不正确');
    if (!NumberTool.isIntegerInRange(userUpdateDto.body.status, 0, 2)) return Result.fail('状态不正确');
    if (userUpdateDto.body.status == 1) return Result.fail('状态不正确');

    return await this.userService.update(userUpdateDto);
  }
  
  @Post('query')
  async query() { 
    
  }
}
