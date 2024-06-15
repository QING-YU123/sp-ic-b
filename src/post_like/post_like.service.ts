import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostLike } from './entities/post_like.entity';

@Injectable()
export class PostLikeService {
  static repository: Repository<PostLike>;
  constructor(@InjectRepository(PostLike) repository: Repository<PostLike>) { 
    PostLikeService.repository = repository;
  }
}
