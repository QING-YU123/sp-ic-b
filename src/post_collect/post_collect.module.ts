import { Module } from '@nestjs/common';
import { PostCollectService } from './post_collect.service';
import { PostCollectController } from './post_collect.controller';
import { PostCollect } from './entities/post_collect.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostCollect])],
  controllers: [PostCollectController],
  providers: [PostCollectService],
})
export class PostCollectModule {}
