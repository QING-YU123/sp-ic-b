import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repair } from './entities/repair.entity';

@Injectable()
export class RepairService {
  static repository: Repository<Repair>;
  constructor(@InjectRepository(Repair) repository: Repository<Repair>) { 
    RepairService.repository = repository;
  }
}
