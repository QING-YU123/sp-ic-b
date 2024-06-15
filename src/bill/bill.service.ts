import { Injectable } from '@nestjs/common';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BillService {
  static repository: Repository<Bill>;
  constructor(@InjectRepository(Bill) repository: Repository<Bill>) { 
    BillService.repository = repository;
  }
}
