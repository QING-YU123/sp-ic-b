import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { PostService } from 'src/post/post.service';
import { PowerService } from 'src/power/power.service';
import { Repository } from 'typeorm';
import { PostLikeCreateDto } from './dtos/post_like.create.dto';
import { PostLikeDeleteDto } from './dtos/post_like.delete.dto';
import { PostLikeQueryDto } from './dtos/post_like.query.dto';
import { PostLike } from './entities/post_like.entity';

/**
 * 帖子点赞模块服务层
 */
@Injectable()
export class PostLikeService {
  /**
   * 帖子点赞模块数据层
   */
  static repository: Repository<PostLike>;
  constructor(@InjectRepository(PostLike) repository: Repository<PostLike>) { 
    PostLikeService.repository = repository;
  }
  
  /**
   * 帖子点赞创建业务逻辑
   * 
   * @param postLikeCreateDto 帖子点赞创建DTO
   * @returns Result
   */
  async create(postLikeCreateDto: PostLikeCreateDto) {
    if (!(await PowerService.get(postLikeCreateDto)).uPost) return Result.fail(MsgConst.powerLowE);
    if ((await PostLikeService.repository.countBy({
      pid: postLikeCreateDto.body.pid,
      uid: postLikeCreateDto.checkingUid
    })) == 1) return Result.fail(MsgConst.operateFail);
    
    const postLike = await PostLikeService.repository.save({
      uid: postLikeCreateDto.checkingUid,
      pid: postLikeCreateDto.body.pid
    });
    if(postLike != null) PostService.repository.update(postLikeCreateDto.body.pid, { likeNum: () => "likeNum + 1" });

    return Result.isOrNot(postLike != null, MsgConst.postLike.create);
  }
  
  /**
   * 帖子点赞删除业务逻辑
   * 
   * @param postLikeDeleteDto 帖子点赞删除DTO
   * @returns Result
   */
  async delete(postLikeDeleteDto: PostLikeDeleteDto) {
    if (!(await PowerService.get(postLikeDeleteDto)).uPost) return Result.fail(MsgConst.powerLowE);

    const res = await PostLikeService.repository.delete({
      pid: postLikeDeleteDto.body.pid,
      uid: postLikeDeleteDto.checkingUid
    });
    if(res.affected == 1) PostService.repository.update(postLikeDeleteDto.body.pid, { likeNum: () => "likeNum - 1" });

    return Result.isOrNot(res.affected == 1, MsgConst.postLike.delete);
  }
  
  /**
   * 帖子点赞查询业务逻辑
   * 
   * @param postLikeQueryDto 帖子点赞查询DTO
   * @returns Result
   */
  async query(postLikeQueryDto: PostLikeQueryDto) {
    if (!(await PowerService.get(postLikeQueryDto)).uPost) return Result.fail(MsgConst.powerLowE);

    const res = await PostLikeService.repository.countBy({
      pid: postLikeQueryDto.body.pid,
      uid: postLikeQueryDto.checkingUid
    });

    return Result.success(MsgConst.postLike.query + MsgConst.success, res == 1);
  }
}
