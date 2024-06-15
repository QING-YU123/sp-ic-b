import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentService {
  static repository: Repository<Payment>;
  constructor(@InjectRepository(Payment) repository: Repository<Payment>) { 
    PaymentService.repository = repository;
  }
}
