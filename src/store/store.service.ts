import { Injectable } from '@nestjs/common';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  static repository: Repository<Store>;
  constructor(@InjectRepository(Store) repository: Repository<Store>) { 
    StoreService.repository = repository;
  }
}
