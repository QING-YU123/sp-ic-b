import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Result } from 'src/.dtos/result';
import { NumberTool } from 'src/.tools/number.tool';
import { ObjectTool } from 'src/.tools/object.tool';
import { StringTool } from 'src/.tools/string.tool';
import { MsgConst } from './../.const/msg.const';
import { VarConst } from './../.const/var.const';
import { BooleanTool } from './../.tools/boolean.tool';
import { UserBanTalkDto } from './dtos/user.ban_talk.dto';
import { UserCreateDto } from './dtos/user.create.dto';
import { UserDeleteDto } from './dtos/user.delete.dto';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserOpMoneyDto } from './dtos/user.op_money.dto';
import { UserOpenMoneyDto } from './dtos/user.open_money.dto';
import { UserQueryDto } from './dtos/user.query.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { UserResetPasswordAdminDto } from './dtos/user.reset_password_admin.dto';
import { UserResetPasswordOwnDto } from './dtos/user.reset_password_own.dto';
import { UserUpdateDto } from './dtos/user.update.dto';
import { UserUpdateOwnDto } from './dtos/user.update_own.dto';
import { UserUploadHeadImgDto } from './dtos/user.upload_head_img.dto';
import { UserService } from './user.service';
import { NumConst } from 'src/.const/num.const';
import { UserResetPayPasswordDto } from './dtos/user.reset_pay_password.dto';

/**
 * 用户模块控制层
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * 管理员创建用户
   * 手机号不可和已有的重复
   * 仅管理员可调用，超级管理员、普通管理员可以分别创建低层权限用户
   * 超级管理员 > 普通管理员 > 模块管理员、普通用户
   * 
   * @param userCreateDto 用户创建DTO
   * @returns Result
   */
  @Post('create')
  async create(@Body() userCreateDto: UserCreateDto) { 
    if (!NumberTool.isInteger(userCreateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userCreateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(userCreateDto.body.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!StringTool.isLengthInRange(userCreateDto.body.password, 6, 16)) return Result.fail(MsgConst.passwordLengthE);
    if (!NumberTool.isIntegerInRange(userCreateDto.body.power, 2, 9)) return Result.fail(MsgConst.powerAllotE);
    if (userCreateDto.body.power == 4) return Result.fail(MsgConst.powerAllotE);
    if (!StringTool.isLengthInRange(userCreateDto.body.username, 1, 20)) return Result.fail(MsgConst.usernameLengthE);
    if (!StringTool.isLengthInRange(userCreateDto.body.gender, 1, 1)) return Result.fail(MsgConst.genderLengthE);
    if (!VarConst.genders.includes(userCreateDto.body.gender)) return Result.fail(MsgConst.genderE);
    if (!StringTool.isLengthInRange(userCreateDto.body.name, 1, 10)) return Result.fail(MsgConst.nameLengthE);
    if (!StringTool.isLengthInRange(userCreateDto.body.idCard, 18, 18)) return Result.fail(MsgConst.idCardLengthE);
    if (!StringTool.isLengthInRange(userCreateDto.body.address, 1, 255)) return Result.fail(MsgConst.addressLengthE);
    if (!BooleanTool.isBoolean(userCreateDto.body.CP)) return Result.fail(MsgConst.booleanE);
    
    return await this.userService.create(userCreateDto);
  }
  
  /**
   * 管理员删除用户
   * 仅管理员可调用，超级管理员不可被删除
   * 超级管理员 > 普通管理员 > 模块管理员、普通用户
   * 
   * @param userDeleteDto 管理员删除用户DTO
   * @returns Result
   */
  @Post('delete')
  async delete(@Body() userDeleteDto: UserDeleteDto) { 
    if (!NumberTool.isInteger(userDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(userDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.userService.delete(userDeleteDto);
  }

  /**
   * 管理员更新用户信息
   * 手机号不可和已有的重复
   * 仅管理员可调用，超级管理员、普通管理员可以分别更新低层权限用户信息
   * 超级管理员 > 普通管理员 > 模块管理员、普通用户
   * 
   * @param userUpdateDto 管理员更新用户信息DTO
   * @returns Result
   */
  @Post('update')
  async update(@Body() userUpdateDto: UserUpdateDto) { console.log(userUpdateDto);
    if (!NumberTool.isInteger(userUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(userUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!NumberTool.isIntegerInRange(userUpdateDto.body.power, 2, 9)) return Result.fail(MsgConst.powerAllotE);
    if (userUpdateDto.body.power == 4) return Result.fail(MsgConst.powerAllotE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.username, 1, 20)) return Result.fail(MsgConst.usernameLengthE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.gender, 1, 1)) return Result.fail(MsgConst.genderLengthE);
    if (!VarConst.genders.includes(userUpdateDto.body.gender)) return Result.fail(MsgConst.genderE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.introduction, 0, 255))
      return Result.fail(MsgConst.introductionLengthE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.name, 1, 10)) return Result.fail(MsgConst.nameLengthE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.idCard, 18, 18)) return Result.fail(MsgConst.idCardLengthE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.address, 1, 255)) return Result.fail(MsgConst.addressLengthE);
    if (!BooleanTool.isBoolean(userUpdateDto.body.CP)) return Result.fail(MsgConst.booleanE);
    if (!BooleanTool.isBoolean(userUpdateDto.body.banTalk)) return Result.fail(MsgConst.booleanE);
    if (!NumberTool.isIntegerInRange(userUpdateDto.body.status, 0, 2)) return Result.fail(MsgConst.statusE);
    if (userUpdateDto.body.status == 1) return Result.fail(MsgConst.statusE);

    return await this.userService.update(userUpdateDto);
  }
  
  /**
   * 管理员查询用户信息
   * 仅管理员可调用，超级管理员、普通管理员可以分别查询低层权限用户信息
   * 超级管理员可以查到已注销用户，而普通管理员不具备此权限
   * 超级管理员 > 普通管理员 > 模块管理员、普通用户
   * 
   * @param userQueryDto 管理员查询用户信息DTO
   * @returns Result
   */
  @Post('query')
  async query(@Body() userQueryDto: UserQueryDto) { 
    if (!NumberTool.isInteger(userQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(userQueryDto.body.pageSize, 1, NumConst.pageSizeMax))
      return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isIntegerInRange(userQueryDto.body.pageIndex, 1, NumConst.pageIndexMax))
      return Result.fail(MsgConst.pageIndexE);

    return await this.userService.query(userQueryDto);
  }

  /**
   * 管理员重置用户密码
   * 仅管理员可调用，超级管理员、普通管理员可以分别重置低层权限用户密码
   * 超级管理员 > 普通管理员 > 模块管理员、普通用户
   * 
   * @param userResetPasswordAdminDto 管理员重置用户密码DTO
   * @returns Result
   */
  @Post('resetPasswordAdmin')
  async resetPasswordAdmin(@Body() userResetPasswordAdminDto: UserResetPasswordAdminDto) { 
    if (!NumberTool.isInteger(userResetPasswordAdminDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userResetPasswordAdminDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(userResetPasswordAdminDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.userService.resetPasswordAdmin(userResetPasswordAdminDto);
  }

  /**
   * 用户登录
   * 
   * @param userLoginDto 用户登录DTO
   * @returns Result
   */
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) { 
    if (!StringTool.isLengthInRange(userLoginDto.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!StringTool.isLengthInRange(userLoginDto.password, 6, 16)) return Result.fail(MsgConst.passwordLengthE);

    return await this.userService.login(userLoginDto);
  }

  /**
   * 用户注册
   * 手机号不能和已有的重复
   * 
   * @param userRegisterDto 用户注册DTO
   * @returns Result
   */
  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) { 
    if (!StringTool.isLengthInRange(userRegisterDto.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!StringTool.isLengthInRange(userRegisterDto.password, 6, 16)) return Result.fail(MsgConst.passwordLengthE);
    if (!StringTool.isLengthInRange(userRegisterDto.username, 1, 20)) return Result.fail(MsgConst.usernameLengthE);
    if (!StringTool.isLengthInRange(userRegisterDto.gender, 1, 1)) return Result.fail(MsgConst.genderLengthE);
    if (!VarConst.genders.includes(userRegisterDto.gender)) return Result.fail(MsgConst.genderE);
    if (!StringTool.isLengthInRange(userRegisterDto.name, 1, 10)) return Result.fail(MsgConst.nameLengthE);
    if (!StringTool.isLengthInRange(userRegisterDto.idCard, 18, 18)) return Result.fail(MsgConst.idCardLengthE);
    if (!StringTool.isLengthInRange(userRegisterDto.address, 1, 255)) return Result.fail(MsgConst.addressLengthE);

    return await this.userService.register(userRegisterDto);
  }

  /**
   * 用户重置自己的密码
   * 
   * @param userResetPasswordOwnDto 用户重置自己的密码DTO
   * @returns Result
   */
  @Post('resetPasswordOwn')
  async resetPasswordOwn(@Body() userResetPasswordOwnDto: UserResetPasswordOwnDto) {
    if (!NumberTool.isInteger(userResetPasswordOwnDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userResetPasswordOwnDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(userResetPasswordOwnDto.body.oldPassword, 6, 16))
      return Result.fail(MsgConst.oldPasswordLengthE);
    if (!StringTool.isLengthInRange(userResetPasswordOwnDto.body.newPassword, 6, 16))
      return Result.fail(MsgConst.newPasswordLengthE);

    return await this.userService.resetPasswordOwn(userResetPasswordOwnDto);
  }

  /**
   * 用户上传头像
   * 
   * @param userUploadHeadImgDto 用户上传头像DTO
   * @returns Result
   */
  @Post('uploadHeadImg')
  async uploadHeadImg(@Body() userUploadHeadImgDto: UserUploadHeadImgDto) {
    if (!NumberTool.isInteger(userUploadHeadImgDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userUploadHeadImgDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(userUploadHeadImgDto.body.headImg, 1, NumConst.imageMax))
      return Result.fail(MsgConst.imageSizeE);

    return await this.userService.uploadHeadImg(userUploadHeadImgDto);
  }

  /**
   * 用户更新自己的信息
   * 
   * @param userUpdateOwnDto 用户更新自己的信息DTO
   * @returns Result
   */
  @Post('updateOwn')
  async updateOwn(@Body() userUpdateOwnDto: UserUpdateOwnDto) { 
    if (!NumberTool.isInteger(userUpdateOwnDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userUpdateOwnDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(userUpdateOwnDto.body.username, 1, 20)) return Result.fail(MsgConst.usernameLengthE);
    if (!StringTool.isLengthInRange(userUpdateOwnDto.body.gender, 1, 1)) return Result.fail(MsgConst.genderLengthE);
    if (!VarConst.genders.includes(userUpdateOwnDto.body.gender)) return Result.fail(MsgConst.genderE);
    if (!StringTool.isLengthInRange(userUpdateOwnDto.body.introduction, 0, 255))
      return Result.fail(MsgConst.introductionLengthE);

    return await this.userService.updateOwn(userUpdateOwnDto);
  }

  /**
   * 用户禁言
   * 仅拥有管理禁言权限的可以调用，超级管理员、普通管理员可以分别禁言低层权限用户
   * 超级管理员 > 普通管理员 > 模块管理员、普通用户
   * 
   * @param userBanTalkDto 用户禁言DTO
   * @returns Result
   */
  @Post('banTalk')
  async banTalk(@Body() userBanTalkDto: UserBanTalkDto) {
    if (!NumberTool.isInteger(userBanTalkDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userBanTalkDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(userBanTalkDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!BooleanTool.isBoolean(userBanTalkDto.body.banTalk)) return Result.fail(MsgConst.booleanE);

    return await this.userService.banTalk(userBanTalkDto);
  }

  /**
   * 获取用户基本信息
   * 
   * @param userOpenMoneyDto 获取用户基本信息DTO
   * @returns Result
   */
  @Get('get')
  async get(@Query() body: any) {
    if (!NumberTool.isInteger(body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.userService.get(body.id);
  }

  /**
   * 用户开通钱包
   * 
   * @param userOpenMoneyDto 用户开通钱包DTO
   * @returns Result
   */
  @Post('open-money')
  async openMoney(@Body() userOpenMoneyDto: UserOpenMoneyDto) { 
    if (!NumberTool.isInteger(userOpenMoneyDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userOpenMoneyDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(userOpenMoneyDto.body.payPassword, 6, 6))
      return Result.fail(MsgConst.payPasswordLengthE);

    return await this.userService.openMoney(userOpenMoneyDto);
  }

  /**
   * 用户操作钱包
   * money值为正数表示充值，值为负数表示提现
   * 
   * @param userOpMoneyDto 用户操作钱包DTO
   * @returns Result
   */
  @Post('op-money')
  async opMoney(@Body() userOpMoneyDto: UserOpMoneyDto) { 
    if (!NumberTool.isInteger(userOpMoneyDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userOpMoneyDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(userOpMoneyDto.body.money)) return Result.fail(MsgConst.idNotExistE);

    return await this.userService.opMoney(userOpMoneyDto);
  }

  /**
   * 用户重置自己的支付密码
   * 
   * @param userGetOwnDto 用户重置自己的支付密码DTO
   * @returns Result
   */
  @Post('reset-pay-password')
  async resetPayPassword(@Body() userResetPayPasswordDto: UserResetPayPasswordDto) { 
    if (!NumberTool.isInteger(userResetPayPasswordDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userResetPayPasswordDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(userResetPayPasswordDto.body.password, 6, 16))
      return Result.fail(MsgConst.passwordLengthE);
    if (!StringTool.isLengthInRange(userResetPayPasswordDto.body.payPassword, 6, 6))
      return Result.fail(MsgConst.payPasswordLengthE);

    return await this.userService.resetPayPassword(userResetPayPasswordDto);
  }
}
