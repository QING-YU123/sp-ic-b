import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostCommentLike } from './entities/post_comment_like.entity';

@Injectable()
export class PostCommentLikeService {
  static repository: Repository<PostCommentLike>;
  constructor(@InjectRepository(PostCommentLike) repository: Repository<PostCommentLike>) { 
    PostCommentLikeService.repository = repository;
  }
}
