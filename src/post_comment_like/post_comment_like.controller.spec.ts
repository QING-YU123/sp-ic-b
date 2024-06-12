import { Test, TestingModule } from '@nestjs/testing';
import { PostCommentLikeController } from './post_comment_like.controller';
import { PostCommentLikeService } from './post_comment_like.service';

describe('PostCommentLikeController', () => {
  let controller: PostCommentLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostCommentLikeController],
      providers: [PostCommentLikeService],
    }).compile();

    controller = module.get<PostCommentLikeController>(PostCommentLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
