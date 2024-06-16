import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dtos/user.create.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { PasswordTool } from 'src/.tools/password.tool';
import { InitConst } from './../.const/init.const';
import { UserDeleteDto } from './dtos/user.delete.dto';
import { UserUpdateDto } from './dtos/user.update.dto';

@Injectable()
export class UserService {
  static repository: Repository<User>;
  constructor(@InjectRepository(User) repository: Repository<User>) { 
    UserService.repository = repository;
  }
  
  async create(userCreateDto: UserCreateDto) {
    const power = await PowerService.get(userCreateDto);
    if (userCreateDto.body.power == 2) {
      if (!power.mAdmin0) return Result.fail('权限不足');
    } else if (userCreateDto.body.power == 3) {
      if (!power.mUser) return Result.fail('权限不足');
    } else {
      if (!power.mAdmin1) return Result.fail('权限不足');
    }

    userCreateDto.body.password = PasswordTool.encrypt(userCreateDto.body.password);
    userCreateDto.body.headImg = InitConst.user.headImg;
    const user = await UserService.repository.save(userCreateDto.body);

    return Result.isOrNot(user != null, '创建用户失败');
  }
  
  async delete(userDeleteDto: UserDeleteDto) {
    const power = await PowerService.get(userDeleteDto);
    const power1 = await UserService.repository.findOne({ select: ['power'], where: { id: userDeleteDto.body.id } });
    if (power1.power == 1) return Result.fail('权限不足');
    if (power1.power == 2) {
      if (!power.mAdmin0) return Result.fail('权限不足');
    } else if (power1.power == 3) {
      if (!power.mUser) return Result.fail('权限不足');
    } else {
      if (!power.mAdmin1) return Result.fail('权限不足');
    }

    const user = await UserService.repository.update(userDeleteDto.body.id, { status: 1 });

    return Result.isOrNot(user.affected != 0, '删除用户失败');
  }
  
  async update(userUpdateDto: UserUpdateDto) {
    const power = await PowerService.get(userUpdateDto);
    const power1 = await UserService.repository.findOne({ select: ['power'], where: { id: userUpdateDto.body.id } });
    if (power1.power == 1) return Result.fail('权限不足');
    if (power1.power == 2) {
      if (!power.mAdmin0) return Result.fail('权限不足');
    } else if (power1.power == 3) {
      if (!power.mUser) return Result.fail('权限不足');
    } else {
      if (!power.mAdmin1) return Result.fail('权限不足');
    }


  }
}
