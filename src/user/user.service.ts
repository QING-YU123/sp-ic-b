import { Injectable } from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dtos/user.create.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { PasswordTool } from 'src/.tools/password.tool';
import { InitConst } from './../.const/init.const';
import { UserDeleteDto } from './dtos/user.delete.dto';
import { UserUpdateDto } from './dtos/user.update.dto';
import { UserQueryDto } from './dtos/user.query.dto';
import { UserResetPasswordAdminDto } from './dtos/user.reset_password_admin.dto';
import { VarConst } from 'src/.const/var.const';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { UserResetPasswordOwnDto } from './dtos/user.reset_password_own.dto';
import { UserUploadHeadImgDto } from './dtos/user.upload_head_img.dto';
import { UserUpdateOwnDto } from './dtos/user.update_own.dto';
import { UserBanTalkDto } from './dtos/user.ban_talk.dto';
import { MsgConst } from 'src/.const/msg.const';

@Injectable()
export class UserService {
  static repository: Repository<User>;
  constructor(@InjectRepository(User) repository: Repository<User>) { 
    UserService.repository = repository;
  }
  
  async create(userCreateDto: UserCreateDto) {
    const power = await PowerService.get(userCreateDto);
    if (userCreateDto.body.power == 2) {
      if (!power.mAdmin0) return Result.fail(MsgConst.powerLowE);
    } else if (userCreateDto.body.power == 3) {
      if (!power.mUser) return Result.fail(MsgConst.powerLowE);
    } else {
      if (!power.mAdmin1) return Result.fail(MsgConst.powerLowE);
    }
    if ((await UserService.repository.countBy({ phone: userCreateDto.body.phone })) != 0)
      return Result.fail(MsgConst.phoneExistE);

    userCreateDto.body.password = PasswordTool.encrypt(userCreateDto.body.password);
    userCreateDto.body.headImg = InitConst.userHeadImg;
    const user = await UserService.repository.save(userCreateDto.body);

    return Result.isOrNot(user != null, MsgConst.user.create);
  }
  
  async delete(userDeleteDto: UserDeleteDto) {
    const power = await PowerService.get(userDeleteDto);
    const power1 = await UserService.repository.findOne({ select: ['power'], where: { id: userDeleteDto.body.id } });
    if (power1.power == 1) return Result.fail(MsgConst.powerLowE);
    if (power1.power == 2) {
      if (!power.mAdmin0) return Result.fail(MsgConst.powerLowE);
    } else if (power1.power == 3) {
      if (!power.mUser) return Result.fail(MsgConst.powerLowE);
    } else {
      if (!power.mAdmin1) return Result.fail(MsgConst.powerLowE);
    }

    const user = await UserService.repository.update(userDeleteDto.body.id, { status: 1 });

    return Result.isOrNot(user.affected != 0, MsgConst.user.delete);
  }
  
  async update(userUpdateDto: UserUpdateDto) {
    const power = await PowerService.get(userUpdateDto);
    const power1 = await UserService.repository.findOne({ select: ['power'], where: { id: userUpdateDto.body.id } });
    if (power1.power == 1) return Result.fail(MsgConst.powerLowE);
    if (power1.power == 2) {
      if (!power.mAdmin0) return Result.fail(MsgConst.powerLowE);
    } else if (power1.power == 3) {
      if (!power.mUser) return Result.fail(MsgConst.powerLowE);
    } else {
      if (!power.mAdmin1) return Result.fail(MsgConst.powerLowE);
    }
    if (await UserService.repository.countBy({
      phone: userUpdateDto.body.phone,
      id: Not(userUpdateDto.body.id)
    }) != 0) return Result.fail(MsgConst.phoneExistE);

    const user = await UserService.repository.update(userUpdateDto.body.id, userUpdateDto.body);

    return Result.isOrNot(user.affected != 0, MsgConst.user.update);
  }
  
  async query(userQueryDto: UserQueryDto) {
    const power = await PowerService.get(userQueryDto);
    if (!power.mUser) return Result.fail(MsgConst.powerLowE);

    const powerLeft = [3, 5, 6, 7, 8, 9];
    const where = {
      power: power.mAdmin0 ? In([2].concat(powerLeft)) : In([].concat(powerLeft)),
      status: power.mAdmin0 ? In([0, 1, 2]) : In([0, 2])
    };
    const [users, total] = await UserService.repository.findAndCount({
      skip: (userQueryDto.body.pageIndex - 1) * userQueryDto.body.pageSize,
      take: userQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      select: ['id', 'createdTime', 'updatedTime', 'phone', 'power', 'username', 'gender', 'headImg', 'introduction', 'name', 'idCard', 'address', 'money', 'CP', 'banTalk', 'postNum', 'collectNum', 'status'],
      where: where
    });

    return Result.success(MsgConst.user.query + MsgConst.success, {
      data: users,
      total: total
    });
  }
  
  async resetPasswordAdmin(userResetPasswordAdminDto: UserResetPasswordAdminDto) {
    const power = await PowerService.get(userResetPasswordAdminDto);
    const power1 = await UserService.repository.findOne({ select: ['power'], where: { id: userResetPasswordAdminDto.body.id } });
    if (power1.power == 1) return Result.fail(MsgConst.powerLowE);
    else if (power1.power == 2) { 
      if (!power.mAdmin0) return Result.fail(MsgConst.powerLowE);
    }
    else {
      if (!power.mAdmin1) return Result.fail(MsgConst.powerLowE);
    }

    const res = await UserService.repository.update(userResetPasswordAdminDto.body.id,
      { password: PasswordTool.encrypt(VarConst.defaultPassword) });
    
    return Result.isOrNot(res.affected != 0, MsgConst.user.resetPassword);
  }
  
  async login(userLoginDto: UserLoginDto) {
    const user = await UserService.repository.findOne({ where: { phone: userLoginDto.phone } });
    if (user == null) return Result.fail(MsgConst.userNotExistE);
    if (user.password != PasswordTool.encrypt(userLoginDto.password)) return Result.fail(MsgConst.passwordE);
    if (user.status == 2) return Result.fail(MsgConst.userIsBaned);

    delete user.password;
    delete user.status;

    return Result.success(MsgConst.user.login + MsgConst.success, user);
  }
  
  async register(userRegisterDto: UserRegisterDto) {
    if ((await UserService.repository.countBy({ phone: userRegisterDto.phone })) != 0) return Result.fail(MsgConst.phoneExistE);

    userRegisterDto.password = PasswordTool.encrypt(userRegisterDto.password);
    userRegisterDto.headImg = InitConst.userHeadImg;

    const user = await UserService.repository.save(userRegisterDto);
    return Result.isOrNot(user != null, MsgConst.user.register);
  }
  
  async resetPasswordOwn(userResetPasswordOwnDto: UserResetPasswordOwnDto) {
    if ( (await UserService.repository.countBy({
      id: userResetPasswordOwnDto.checkingUid,
      password: PasswordTool.encrypt(userResetPasswordOwnDto.body.oldPassword)
    })) == 0) return Result.fail(MsgConst.oldPasswordE);
    
    const res = await UserService.repository.update(userResetPasswordOwnDto.checkingUid,
      { password: PasswordTool.encrypt(userResetPasswordOwnDto.body.newPassword) });
    
    return Result.isOrNot(res.affected != 0, MsgConst.user.resetPassword);
  }
  
  async uploadHeadImg(userUploadHeadImgDto: UserUploadHeadImgDto) {
    const user = await UserService.repository.findOne({ where: { id: userUploadHeadImgDto.checkingUid } });
    if (user == null) return Result.fail(MsgConst.userNotExistE);

    const res = await UserService.repository.update(userUploadHeadImgDto.checkingUid,
      { headImg: userUploadHeadImgDto.body.headImg });
    
    return Result.isOrNot(res.affected != 0, MsgConst.user.uploadHeadImg);
  }
  
  async updateOwn(userUpdateOwnDto: UserUpdateOwnDto) {
    const user = await UserService.repository.findOne({ where: { id: userUpdateOwnDto.checkingUid } });
    if (user == null) return Result.fail(MsgConst.userNotExistE);

    const res = await UserService.repository.update(userUpdateOwnDto.checkingUid, userUpdateOwnDto.body);
    
    return Result.isOrNot(res.affected != 0, MsgConst.user.updateOwn);
  }
  
  async banTalk(userBanTalkDto: UserBanTalkDto) {
    if (!(await PowerService.get(userBanTalkDto)).mBanTalk) return Result.fail(MsgConst.powerLowE);

    const res = await UserService.repository.update(userBanTalkDto.body.id, { banTalk: userBanTalkDto.body.banTalk });
    
    return Result.isOrNot(res.affected != 0, MsgConst.operate);
  }
  
  async get(id: number) {
    const user = await UserService.repository.findOne({ select: ['id', 'power', 'username', 'gender', 'headImg', 'introduction', 'CP'], where: { id } });
    if (user == null) return Result.fail(MsgConst.userNotExistE);

    return Result.success(MsgConst.user.get + MsgConst.success, user);
  }
}
