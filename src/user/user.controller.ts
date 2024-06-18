import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { OutsiderService } from 'src/outsider/outsider.service';
import { UserCreateDto } from './dtos/user.create.dto';
import { Result } from 'src/.dtos/result';
import { NumberTool } from 'src/.tools/number.tool';
import { StringTool } from 'src/.tools/string.tool';
import { UserDeleteDto } from './dtos/user.delete.dto';
import { UserUpdateDto } from './dtos/user.update.dto';
import { VarConst } from './../.const/var.const';
import { UserQueryDto } from './dtos/user.query.dto';
import { UserResetPasswordAdminDto } from './dtos/user.reset_password_admin.dto';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { UserResetPasswordOwnDto } from './dtos/user.reset_password_own.dto';
import { UserUploadHeadImgDto } from './dtos/user.upload_head_img.dto';
import { UserUpdateOwnDto } from './dtos/user.update_own.dto';
import { UserBanTalkDto } from './dtos/user.ban_talk.dto';
import { BooleanTool } from './../.tools/boolean.tool';
import { MsgConst } from './../.const/msg.const';
import { ObjectTool } from 'src/.tools/object.tool';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

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
  
  @Post('delete')
  async delete(@Body() userDeleteDto: UserDeleteDto) { 
    if (!NumberTool.isInteger(userDeleteDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userDeleteDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(userDeleteDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.userService.delete(userDeleteDto);
  }

  @Post('update')
  async update(@Body() userUpdateDto: UserUpdateDto) { 
    if (!NumberTool.isInteger(userUpdateDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userUpdateDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(userUpdateDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!NumberTool.isIntegerInRange(userUpdateDto.body.power, 2, 9)) return Result.fail(MsgConst.powerAllotE);
    if (userUpdateDto.body.power == 4) return Result.fail(MsgConst.powerAllotE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.username, 1, 20)) return Result.fail(MsgConst.usernameLengthE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.gender, 1, 1)) return Result.fail(MsgConst.genderLengthE);
    if (!VarConst.genders.includes(userUpdateDto.body.gender)) return Result.fail(MsgConst.genderE);
    if (!StringTool.isLengthInRange(userUpdateDto.body.headImg, 1, 16000000)) return Result.fail(MsgConst.imageSizeE);
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
  
  @Post('query')
  async query(@Body() userQueryDto: UserQueryDto) { 
    if (!NumberTool.isInteger(userQueryDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userQueryDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isIntegerInRange(userQueryDto.body.pageSize, 1, 100)) return Result.fail(MsgConst.pageSizeE);
    if (!NumberTool.isInteger(userQueryDto.body.pageIndex)) return Result.fail(MsgConst.pageIndexE);

    return await this.userService.query(userQueryDto);
  }

  @Post('resetPasswordAdmin')
  async resetPasswordAdmin(@Body() userResetPasswordAdminDto: UserResetPasswordAdminDto) { 
    if (!NumberTool.isInteger(userResetPasswordAdminDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userResetPasswordAdminDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(userResetPasswordAdminDto.body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.userService.resetPasswordAdmin(userResetPasswordAdminDto);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) { 
    if (!StringTool.isLengthInRange(userLoginDto.phone, 11, 11)) return Result.fail(MsgConst.phoneLengthE);
    if (!StringTool.isLengthInRange(userLoginDto.password, 6, 16)) return Result.fail(MsgConst.passwordLengthE);

    return await this.userService.login(userLoginDto);
  }

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

  @Post('uploadHeadImg')
  async uploadHeadImg(@Body() userUploadHeadImgDto: UserUploadHeadImgDto) {
    if (!NumberTool.isInteger(userUploadHeadImgDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userUploadHeadImgDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!StringTool.isLengthInRange(userUploadHeadImgDto.body.headImg, 1, 16000000))
      return Result.fail(MsgConst.imageSizeE);

    return await this.userService.uploadHeadImg(userUploadHeadImgDto);
  }

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

  @Post('banTalk')
  async banTalk(@Body() userBanTalkDto: UserBanTalkDto) {
    if (!NumberTool.isInteger(userBanTalkDto.checkingUid)) return Result.fail(MsgConst.powerLowE);
    if (!ObjectTool.isBodyExist(userBanTalkDto)) return Result.fail(MsgConst.bodyNotExistE);
    if (!NumberTool.isInteger(userBanTalkDto.body.id)) return Result.fail(MsgConst.idNotExistE);
    if (!BooleanTool.isBoolean(userBanTalkDto.body.banTalk)) return Result.fail(MsgConst.booleanE);

    return await this.userService.banTalk(userBanTalkDto);
  }

  @Get('get')
  async get(@Query() body: any) {
    if (!NumberTool.isInteger(body.id)) return Result.fail(MsgConst.idNotExistE);

    return await this.userService.get(body.id);
  }
}
