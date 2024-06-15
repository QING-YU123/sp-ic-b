import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  static repository: Repository<Post>;
  constructor(@InjectRepository(Post) repository: Repository<Post>) { 
    PostService.repository = repository;
  }
}
