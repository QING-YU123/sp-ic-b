import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { PowerService } from 'src/power/power.service';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { PostCommentCreateDto } from './dtos/post_comment.create.dto';
import { PostCommentDeleteDto } from './dtos/post_comment.delete.dto';
import { PostCommentQueryDto } from './dtos/post_comment.query.dto';
import { PostComment } from './entities/post_comment.entity';
import { PostService } from 'src/post/post.service';
import { TimeTool } from 'src/.tools/time.tool';

/**
 * 帖子评论模块服务层
 */
@Injectable()
export class PostCommentService {
  /** 
   * 帖子评论模块数据层
   */
  static repository: Repository<PostComment>;
  constructor(@InjectRepository(PostComment) repository: Repository<PostComment>) { 
    PostCommentService.repository = repository;
  }
  
  /**
   * 帖子评论记录创建
   * 
   * @param postCommentCreateDto 帖子评论记录DTO
   * @returns Result
   */
  async create(postCommentCreateDto: PostCommentCreateDto) {
    if (!(await PowerService.get(postCommentCreateDto)).uPost) return Result.fail(MsgConst.powerLowE);
    const user = await UserService.repository.findOne({
      select: ['banTalk'],
      where: { id: postCommentCreateDto.checkingUid }
    });
    if (user.banTalk) return Result.fail(MsgConst.userIsBannedTalk);

    postCommentCreateDto.body.uid = postCommentCreateDto.checkingUid;
    const res = await PostCommentService.repository.save(postCommentCreateDto.body);
    if (res != null) PostService.repository.update(postCommentCreateDto.body.pid, { commentNum: () => 'commentNum + 1' });

    return Result.isOrNot(res != null, MsgConst.postComment.create);
  }
  
  /**
   * 帖子评论记录删除
   * 
   * @param postCommentDeleteDto 帖子评论记录DTO
   * @returns Result
   */
  async delete(postCommentDeleteDto: PostCommentDeleteDto) {
    const pc = await PostCommentService.repository.findOne({
      select: ['uid', 'pid'],
      where: { id: postCommentDeleteDto.body.id }
    });
    if (pc.uid != postCommentDeleteDto.checkingUid) {
      if(!(await PowerService.get(postCommentDeleteDto)).mApprove) return Result.fail(MsgConst.powerLowE);
    }

    const res = await PostCommentService.repository.update(postCommentDeleteDto.body.id, {
      status: pc.uid == postCommentDeleteDto.checkingUid ? 2 : 1
    });
    if (res.affected != 0) PostService.repository.update(pc.pid, { commentNum: () => 'commentNum - 1' });


    return Result.isOrNot(res.affected != 0, MsgConst.postComment.delete);
  }
  
  /**
   * 帖子评论记录查询
   * 
   * @param postCommentQueryDto 帖子评论记录查询DTO
   * @returns Result
   */
  async query(postCommentQueryDto: PostCommentQueryDto) {
    if (!(await PowerService.get(postCommentQueryDto)).uPost) return Result.fail(MsgConst.powerLowE);

    let [data, total] = await PostCommentService.repository.findAndCount({
      skip: (postCommentQueryDto.body.pageIndex - 1) * postCommentQueryDto.body.pageSize,
      take: postCommentQueryDto.body.pageSize,
      order: { likeNum: 'DESC' },
      where: { pid: postCommentQueryDto.body.pid, status: 0 }
    });
    let user = await UserService.repository.find({
      select: ['id', 'username', 'headImg'],
      where: {id: In(data.map(item => item.uid))}
    });
    user.forEach(item => { item.headImg = item.headImg.toString(); });
    let data1: any = data;
    data1.forEach(item => {
      item.user = user.find(userItem => userItem.id == item.uid);
      delete item.uid;
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
    });

    return Result.success(MsgConst.postComment.query + MsgConst.success,
      { data: data, total: total });
  }
}
