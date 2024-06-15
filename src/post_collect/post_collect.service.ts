import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCollect } from './entities/post_collect.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostCollectService {
  static repository: Repository<PostCollect>;
  constructor(@InjectRepository(PostCollect) repository: Repository<PostCollect>) { 
    PostCollectService.repository = repository;
  }
}
