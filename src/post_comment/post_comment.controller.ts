import { Controller } from '@nestjs/common';
import { PostCommentService } from './post_comment.service';

@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}
}
