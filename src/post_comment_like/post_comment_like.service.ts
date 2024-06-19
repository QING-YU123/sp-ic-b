import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostCommentLike } from './entities/post_comment_like.entity';
import { PostCommentLikeCreateDto } from './dtos/post_comment_like.create.dto';
import { PostCommentLikeDeleteDto } from './dtos/post_comment_like.delete';
import { PostCommentLikeQueryDto } from './dtos/post_comment_like.query';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { PostCommentService } from 'src/post_comment/post_comment.service';

@Injectable()
export class PostCommentLikeService {
  static repository: Repository<PostCommentLike>;
  constructor(@InjectRepository(PostCommentLike) repository: Repository<PostCommentLike>) { 
    PostCommentLikeService.repository = repository;
  }

  async create(postCommentLikeCreateDto: PostCommentLikeCreateDto) {
    if (!(await PowerService.get(postCommentLikeCreateDto)).uPost) return Result.fail(MsgConst.powerLowE);
    if ((await PostCommentLikeService.repository.countBy({
      pcid: postCommentLikeCreateDto.body.pcid,
      uid: postCommentLikeCreateDto.checkingUid
    })) == 1) return Result.fail(MsgConst.operateFail);
    
    const postLike = await PostCommentLikeService.repository.save({
      uid: postCommentLikeCreateDto.checkingUid,
      pcid: postCommentLikeCreateDto.body.pcid
    });
    if (postLike != null) PostCommentService.repository.update(postCommentLikeCreateDto.body.pcid,
      { likeNum: () => "likeNum + 1" });

    return Result.isOrNot(postLike != null, MsgConst.postCommentLike.create);
  }
  
  async delete(postCommentLikeDeleteDto: PostCommentLikeDeleteDto) {
    if (!(await PowerService.get(postCommentLikeDeleteDto)).uPost) return Result.fail(MsgConst.powerLowE);

    const res = await PostCommentLikeService.repository.delete({
      pcid: postCommentLikeDeleteDto.body.pcid,
      uid: postCommentLikeDeleteDto.checkingUid
    });
    if(res.affected == 1) PostCommentService.repository.update(postCommentLikeDeleteDto.body.pcid, { likeNum: () => "likeNum - 1" });

    return Result.isOrNot(res.affected == 1, MsgConst.postCommentLike.delete);
  }
  
  async query(postCommentLikeQueryDto: PostCommentLikeQueryDto) {
    if (!(await PowerService.get(postCommentLikeQueryDto)).uPost) return Result.fail(MsgConst.powerLowE);

    const res = await PostCommentLikeService.repository.countBy({
      pcid: postCommentLikeQueryDto.body.pcid,
      uid: postCommentLikeQueryDto.checkingUid
    });

    return Result.success(MsgConst.postCommentLike.query + MsgConst.success, res == 1);
  }
}
