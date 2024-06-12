import { Module } from '@nestjs/common';
import { PostCommentLikeService } from './post_comment_like.service';
import { PostCommentLikeController } from './post_comment_like.controller';
import { PostCommentLike } from './entities/post_comment_like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostCommentLike])],
  controllers: [PostCommentLikeController],
  providers: [PostCommentLikeService],
})
export class PostCommentLikeModule {}
