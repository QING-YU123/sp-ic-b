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

  static openCheck = true;

  async init() {
    const res = await PowerService.repository.find();
    res.forEach((item) => { 
      PowerService.powerList[item.id] = item;
    })
  }

  static async get(dto: Dto) {
    if (PowerService.powerList.length < 10) return new Power();
    if (!this.openCheck) return PowerService.powerList[1];
    const user = await UserService.repository.findOne({ select: ['power'], where: { id: dto.checkingUid } });
    if (user == null) return new Power();
    return PowerService.powerList[user.power];
  }
}
