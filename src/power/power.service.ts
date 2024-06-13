import { Injectable } from '@nestjs/common';
import { Power } from './entities/power.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PowerService {
  static repository: Repository<Power>;
  constructor(@InjectRepository(Power) repository: Repository<Power>) { 
    PowerService.repository = repository;
  }
}
