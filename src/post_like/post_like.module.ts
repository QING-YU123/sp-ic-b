import { Module } from '@nestjs/common';
import { PostLikeService } from './post_like.service';
import { PostLikeController } from './post_like.controller';
import { PostLike } from './entities/post_like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostLike])],
  controllers: [PostLikeController],
  providers: [PostLikeService],
})
export class PostLikeModule {}
