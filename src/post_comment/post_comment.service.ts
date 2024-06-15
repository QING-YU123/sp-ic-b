import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostComment } from './entities/post_comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostCommentService {
  static repository: Repository<PostComment>;
  constructor(@InjectRepository(PostComment) repository: Repository<PostComment>) { 
    PostCommentService.repository = repository;
  }
}
