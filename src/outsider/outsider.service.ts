import { Injectable } from '@nestjs/common';
import { OutsiderCreateDto } from './dtos/outsider.create.dto';
import { Outsider } from './entities/outsider.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeTool } from './../.tools/time.tool';
import { Result } from 'src/.dtos/result';

@Injectable()
export class OutsiderService {
  static repository: Repository<Outsider>;
  constructor(@InjectRepository(Outsider) repository: Repository<Outsider>) { 
    OutsiderService.repository = repository;
  }
    
  async create(outsiderCreateDto: OutsiderCreateDto) {
    

    outsiderCreateDto.body.createdTime = TimeTool.getNowString();

    return Result.isOrNot((await OutsiderService.repository.save(outsiderCreateDto.body)) != null);
  }
}
