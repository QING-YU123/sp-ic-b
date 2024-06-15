import { Injectable } from '@nestjs/common';
import { Parking } from './entities/parking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingService {
  static repository: Repository<Parking>;
  constructor(@InjectRepository(Parking) repository: Repository<Parking>) { 
    ParkingService.repository = repository;
  }
}
