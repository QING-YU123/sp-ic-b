import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
  static repository: Repository<Log>;
  constructor(@InjectRepository(Log) repository: Repository<Log>) { 
    LogService.repository = repository;
  }
}
