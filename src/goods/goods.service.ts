import { Injectable } from '@nestjs/common';
import { Goods } from './entities/goods.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GoodsService {
  static repository: Repository<Goods>;
  constructor(@InjectRepository(Goods) repository: Repository<Goods>) { 
    GoodsService.repository = repository;
  }
}
