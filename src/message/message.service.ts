import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  static repository: Repository<Message>;
  constructor(@InjectRepository(Message) repository: Repository<Message>) { 
    MessageService.repository = repository;
  }
}
