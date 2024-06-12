import { Controller } from '@nestjs/common';
import { PostCollectService } from './post_collect.service';

@Controller('post-collect')
export class PostCollectController {
  constructor(private readonly postCollectService: PostCollectService) {}
}
