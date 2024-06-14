import { Injectable } from '@nestjs/common';
import { Power } from './entities/power.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Dto } from 'src/.dtos/dto';

@Injectable()
export class PowerService {
  static repository: Repository<Power>;
  constructor(@InjectRepository(Power) repository: Repository<Power>) { 
    PowerService.repository = repository;
    this.init();
  }

  static powerList: Power[] = [];

  async init() {
    const res = await PowerService.repository.find();
    res.forEach((item) => { 
      PowerService.powerList[item.id] = item;
    })
  }

  static async get(dto: Dto) {
    const user = await UserService.repository.findOne({ select: ['power'], where: { id: dto.checkingUid } });
    if (user == null) return new Power();
    return PowerService.powerList[user.power];
  }
}
