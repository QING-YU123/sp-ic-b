import { Module } from '@nestjs/common';
import { PostCommentService } from './post_comment.service';
import { PostCommentController } from './post_comment.controller';
import { PostComment } from './entities/post_comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostComment])],
  controllers: [PostCommentController],
  providers: [PostCommentService],
})
export class PostCommentModule {}
