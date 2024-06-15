import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {
  static repository: Repository<Activity>;
  constructor(@InjectRepository(Activity) repository: Repository<Activity>) { 
    ActivityService.repository = repository;
  }
}
