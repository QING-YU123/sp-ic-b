import { Injectable } from '@nestjs/common';
import { Notice } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  static repository: Repository<Notice>;
  constructor(@InjectRepository(Notice) repository: Repository<Notice>) { 
    NoticeService.repository = repository;
  }
}
