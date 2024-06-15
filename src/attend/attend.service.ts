import { Injectable } from '@nestjs/common';
import { Attend } from './entities/attend.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttendService {
  static repository: Repository<Attend>;
  constructor(@InjectRepository(Attend) repository: Repository<Attend>) { 
    AttendService.repository = repository;
  }
}
