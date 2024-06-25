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
import { ParkingService } from 'src/parking/parking.service';
import { UserOpenMoneyDto } from './dtos/user.open_money.dto';
import { UserOpMoneyDto } from './dtos/user.op_money.dto';
import { BillService } from 'src/bill/bill.service';
import { TimeTool } from 'src/.tools/time.tool';
import { UserResetPayPasswordDto } from './dtos/user.reset_pay_password.dto';

/**
 * 用户模块服务层
 */
@Injectable()
export class UserService {
  /** 
   * 用户模块数据层
   */
  static repository: Repository<User>;
  constructor(@InjectRepository(User) repository: Repository<User>) { 
    UserService.repository = repository;
  }
  
  /**
   * 管理员创建用户业务逻辑处理
   * 
   * @param userRegisterDto 管理员创建用户DTO
   * @returns Result
   */
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
  
  /**
   * 管理员删除用户业务逻辑处理
   * 
   * @param userLoginDto 管理员删除用户DTO
   * @returns Result
   */
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
  
  /**
   * 管理员更新用户业务逻辑处理
   * 
   * @param userUpdateDto 管理员更新用户DTO
   * @returns Result
   */
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
  
  /**
   * 管理员查询用户业务逻辑处理
   * 
   * @param userQueryDto 管理员查询用户DTO
   * @returns Result
   */
  async query(userQueryDto: UserQueryDto) {
    const power = await PowerService.get(userQueryDto);
    if (!power.mUser) return Result.fail(MsgConst.powerLowE);

    const powerLeft = [3, 5, 6, 7, 8, 9];
    const where = {
      power: power.mAdmin0 ? In([2].concat(powerLeft)) : In([].concat(powerLeft)),
      status: power.mAdmin0 ? In([0, 1, 2]) : In([0, 2])
    };
    let [data, total] = await UserService.repository.findAndCount({
      skip: (userQueryDto.body.pageIndex - 1) * userQueryDto.body.pageSize,
      take: userQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      select: ['id', 'createdTime', 'updatedTime', 'phone', 'power', 'username', 'gender', 'introduction', 'name', 'idCard', 'address', 'money', 'CP', 'banTalk', 'postNum', 'collectNum', 'status'],
      where: where
    });
    let data1: any = data;
    data1.forEach(item => {
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
    });

    return Result.success(MsgConst.user.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
  
  /**
   * 管理员重置用户密码业务逻辑处理
   * 
   * @param userResetPasswordAdminDto 管理员重置用户密码DTO
   * @returns Result
   */
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
  
  /**
   * 用户登录业务逻辑处理
   * 
   * @param userLoginDto 用户登录DTO
   * @returns Result
   */
  async login(userLoginDto: UserLoginDto) {
    const user = await UserService.repository.findOne({ where: { phone: userLoginDto.phone } });
    if (user == null) return Result.fail(MsgConst.userNotExistE);
    if ((await UserService.repository.findOne({
      select: ['id'],
      where: { id: user.id, password: PasswordTool.encrypt(userLoginDto.password) }
    })) == null) return Result.fail(MsgConst.passwordE);
    if (user.status == 2) return Result.fail(MsgConst.userIsBanned);

    delete user.password;
    delete user.status;
    user.headImg = user.headImg.toString();
    let user1: any = user;
    user1.parking = await ParkingService.repository.findOne({
      select: ['updatedTime', 'carNum', 'price', 'id'],
      where: { uid: user.id }
    });
    user1.createdTime = TimeTool.convertToDate(user1.createdTime);
    user1.updatedTime = TimeTool.convertToDate(user1.updatedTime);
    if (user1.parking != null) user1.parking.updatedTime = TimeTool.convertToDate(user1.parking.updatedTime);

    return Result.success(MsgConst.user.login + MsgConst.success, user);
  }
  
  /**
   * 用户注册业务逻辑处理
   * 
   * @param userRegisterDto 用户注册DTO
   * @returns Result
   */
  async register(userRegisterDto: UserRegisterDto) {
    if ((await UserService.repository.countBy({ phone: userRegisterDto.phone })) != 0) return Result.fail(MsgConst.phoneExistE);

    userRegisterDto.password = PasswordTool.encrypt(userRegisterDto.password);
    userRegisterDto.headImg = InitConst.userHeadImg;

    const user = await UserService.repository.save(userRegisterDto);
    return Result.isOrNot(user != null, MsgConst.user.register);
  }
  
  /**
   * 用户重置密码业务逻辑处理
   * 
   * @param userResetPasswordOwnDto 用户重置密码DTO
   * @returns Result
   */
  async resetPasswordOwn(userResetPasswordOwnDto: UserResetPasswordOwnDto) {
    if ( (await UserService.repository.countBy({
      id: userResetPasswordOwnDto.checkingUid,
      password: PasswordTool.encrypt(userResetPasswordOwnDto.body.oldPassword)
    })) == 0) return Result.fail(MsgConst.oldPasswordE);
    
    const res = await UserService.repository.update(userResetPasswordOwnDto.checkingUid,
      { password: PasswordTool.encrypt(userResetPasswordOwnDto.body.newPassword) });
    
    return Result.isOrNot(res.affected != 0, MsgConst.user.resetPassword);
  }
  
  /**
   * 用户上传头像业务逻辑处理
   * 
   * @param userUploadHeadImgDto 用户上传头像DTO
   * @returns Result
   */
  async uploadHeadImg(userUploadHeadImgDto: UserUploadHeadImgDto) {
    const user = await UserService.repository.findOne({ where: { id: userUploadHeadImgDto.checkingUid } });
    if (user == null) return Result.fail(MsgConst.userNotExistE);

    const res = await UserService.repository.update(userUploadHeadImgDto.checkingUid,
      { headImg: userUploadHeadImgDto.body.headImg });
    
    return Result.isOrNot(res.affected != 0, MsgConst.user.uploadHeadImg);
  }
  
  /**
   * 用户更新自己的信息业务逻辑处理
   * 
   * @param userUpdateOwnDto 用户更新自己的信息DTO
   * @returns Result
   */
  async updateOwn(userUpdateOwnDto: UserUpdateOwnDto) {
    const user = await UserService.repository.findOne({ where: { id: userUpdateOwnDto.checkingUid } });
    if (user == null) return Result.fail(MsgConst.userNotExistE);

    const res = await UserService.repository.update(userUpdateOwnDto.checkingUid, userUpdateOwnDto.body);
    
    return Result.isOrNot(res.affected != 0, MsgConst.user.updateOwn);
  }
  
  /**
   * 用户禁言业务逻辑处理
   * 
   * @param userBanTalkDto 用户禁言DTO
   * @returns Result
   */
  async banTalk(userBanTalkDto: UserBanTalkDto) {
    const power = await PowerService.get(userBanTalkDto);
    if (!power.mBanTalk) return Result.fail(MsgConst.powerLowE);
    const user = await UserService.repository.findOne({ select: ['power'], where: { id: userBanTalkDto.body.id } });
    if (user.power == 1) return Result.fail(MsgConst.powerLowE);
    else if (user.power == 2) {
      if (!power.mAdmin0) return Result.fail(MsgConst.powerLowE);
    }
    else if (user.power == 3) {
      if (!power.mUser) return Result.fail(MsgConst.powerLowE);
    }
    else {
      if (!power.mAdmin1) return Result.fail(MsgConst.powerLowE);
    }

    const res = await UserService.repository.update(userBanTalkDto.body.id, { banTalk: userBanTalkDto.body.banTalk });
    
    return Result.isOrNot(res.affected != 0, MsgConst.operate);
  }
  
  /**
   * 用户获取自己的信息业务逻辑处理
   * 
   * @param id 用户id
   * @returns Result
   */
  async get(id: number) {
    const user = await UserService.repository.findOne({ select: ['id', 'power', 'username', 'gender', 'headImg', 'introduction', 'CP'], where: { id } });
    if (user == null) return Result.fail(MsgConst.userNotExistE);

    user.headImg = user.headImg.toString();

    return Result.success(MsgConst.user.get + MsgConst.success, user);
  }
  
  /**
   * 用户获开通钱包业务逻辑处理
   * 
   * @param userOpenMoneyDto 用户开通钱包DTO
   * @returns Result
   */
  async openMoney(userOpenMoneyDto: UserOpenMoneyDto) {
    if (!(await PowerService.get(userOpenMoneyDto)).uMoney) return Result.fail(MsgConst.powerLowE);
    const user = await UserService.repository.findOne({ select: ['money', 'id'], where: { id: userOpenMoneyDto.checkingUid } });
    if (user.money != null) return Result.fail(MsgConst.hadOpenMoney);
    const res = await UserService.repository.update(userOpenMoneyDto.checkingUid, {
      money: 0,
      payPassword : PasswordTool.encrypt(userOpenMoneyDto.body.payPassword)
    });

    return Result.isOrNot(res.affected != 0, MsgConst.user.openMoney);
  }
  
  /**
   * 用户操作余额业务逻辑处理
   * 
   * @param userOpMoneyDto 用户操作余额DTO
   * @returns Result
   */
  async opMoney(userOpMoneyDto: UserOpMoneyDto) {
    if (!(await PowerService.get(userOpMoneyDto)).uMoney) return Result.fail(MsgConst.powerLowE);
    const user = await UserService.repository.findOne({ select: ['id', 'money'], where: { id: userOpMoneyDto.checkingUid } });
    if (user.money == null) return Result.fail(MsgConst.notOpenMoney);
    if (user.money - (-userOpMoneyDto.body.money) < 0) return Result.fail(MsgConst.notEnoughMoneyE);

    const res = await UserService.repository.update(userOpMoneyDto.checkingUid, {
      money: () => "user.money + " + userOpMoneyDto.body.money
    });
    if (res.affected != 0) {
      BillService.repository.save({
        uid: user.id,
        title: userOpMoneyDto.body.money > 0 ? MsgConst.user.addMoney : MsgConst.user.redMoney,
        content: "剩余金额：" + (user.money - (-userOpMoneyDto.body.money)) / 100 + "元",
        price: userOpMoneyDto.body.money,
        receiptUid: userOpMoneyDto.checkingUid,
        status: 2,
        payTime: "NOW()"
      });
    }

    return Result.isOrNot(res.affected != 0,
      userOpMoneyDto.body.money > 0 ? MsgConst.user.addMoney : MsgConst.user.redMoney);
  }
  
  /**
   * 用户重置支付密码业务逻辑处理
   * 
   * @param userResetPayPasswordDto 用户重置支付密码DTO
   * @returns Result
   */
  async resetPayPassword(userResetPayPasswordDto: UserResetPayPasswordDto) {
    if (!(await PowerService.get(userResetPayPasswordDto)).uMoney) return Result.fail(MsgConst.powerLowE);

    const res = await UserService.repository.update({
      id: userResetPayPasswordDto.checkingUid,
      phone: userResetPayPasswordDto.body.phone,
      password: PasswordTool.encrypt(userResetPayPasswordDto.body.password)
    }, { payPassword: PasswordTool.encrypt(userResetPayPasswordDto.body.payPassword) });

    return Result.isOrNot(res.affected != 0, MsgConst.user.resetPayPassword);
  }
}
