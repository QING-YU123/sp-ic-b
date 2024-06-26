import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostCreateDto } from './dtos/post.create.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { PostDeleteDto } from './dtos/post.delete.dto';
import { UserService } from 'src/user/user.service';
import { PostUpdateDto } from './dtos/post.update.dto';
import { PostQueryDto } from './dtos/post.query.dto';
import { TimeTool } from 'src/.tools/time.tool';
import { PostGetCoverImgDto } from './dtos/post.get_cover_img.dto';
import { PostGetContentDto } from './dtos/post.get_content.dto';

/**
 * 帖子模块服务层
 */
@Injectable()
export class PostService {
  /**
   * 帖子模块数据层
   */
  static repository: Repository<Post>;
  constructor(@InjectRepository(Post) repository: Repository<Post>) { 
    PostService.repository = repository;
  }
  
  /**
   * 帖子创建业务逻辑处理
   * 
   * @param postCreateDto 帖子创建DTO
   * @returns Result
   */
  async create(postCreateDto: PostCreateDto) {
    const power = await PowerService.get(postCreateDto);
    if (!power.uPost) return Result.fail(MsgConst.powerLowE);
    if ((await UserService.repository.findOne({
      select: ['banTalk'],
      where: { id: postCreateDto.checkingUid }
    })).banTalk) return Result.fail(MsgConst.userIsBannedTalk);


    postCreateDto.body.uid = postCreateDto.checkingUid;
    postCreateDto.body.status = power.mApprove ? 0 : 3;
    const post = PostService.repository.save(postCreateDto.body);
    if (post != null) {
      UserService.repository.update(postCreateDto.checkingUid, {
        postNum: () => 'postNum + 1'
      });
    }
  
    return Result.isOrNot(post != null, MsgConst.post.create);
  }
  
  /**
   * 帖子删除业务逻辑处理
   * 
   * @param postDeleteDto 帖子删除DTO
   * @returns Result
   */
  async delete(postDeleteDto: PostDeleteDto) {
    const power = await PowerService.get(postDeleteDto);
    const post = await PostService.repository.findOne({ select: ['uid'], where: { id: postDeleteDto.body.id } });
    if (postDeleteDto.checkingUid != post.uid) {
      if (!power.mApprove) return Result.fail(MsgConst.powerLowE);
    }
    
    const result = await PostService.repository.update(postDeleteDto.body.id, {
      status: postDeleteDto.checkingUid == post.uid ? 2 : 1
    });
    if (result.affected == 1) { 
      UserService.repository.update(post.uid, {
        postNum: () => 'postNum - 1'
      });
    }

    return Result.isOrNot(result.affected == 1, MsgConst.post.delete);
  }
  
  /**
   * 帖子审核业务逻辑处理
   * 
   * @param postDeleteDto 帖子审核DTO
   * @returns Result
   */
  async update(postDeleteDto: PostUpdateDto) {
    if (!(await PowerService.get(postDeleteDto)).mApprove) return Result.fail(MsgConst.powerLowE);

    const res = await PostService.repository.update(postDeleteDto.body.id,
      { status: postDeleteDto.body.approved ? 0 : 1 });
    if (res.affected == 1) {
      if (!postDeleteDto.body.approved) {
        const post = await PostService.repository.findOne({
          select: ['uid'],
          where: { id: postDeleteDto.body.id }
        });
        UserService.repository.update(post.uid, {
          postNum: () => 'postNum - 1'
        });
      }
    }

    return Result.isOrNot(res.affected == 1, MsgConst.post.update);
  }
  
  /**
   * 帖子查询业务逻辑处理
   * 
   * @param postQueryDto 帖子查询DTO
   * @returns Result
   */
  async query(postQueryDto: PostQueryDto) {
    const power = await PowerService.get(postQueryDto)
    if (!power.uPost) return Result.fail(MsgConst.powerLowE);
    if (!power.mApprove) postQueryDto.body.approved = true;
    if (postQueryDto.body.search == null) postQueryDto.body.search = '';
    const [data, total] = await PostService.repository.createQueryBuilder('post')
      .skip((postQueryDto.body.pageIndex - 1) * postQueryDto.body.pageSize)
      .take(postQueryDto.body.pageSize)
      .orderBy('post.id', 'DESC') 
      .where('post.status = :status)',
        {
          status: postQueryDto.body.approved ? 0 : 3
        })
      .getManyAndCount();
    const user = await UserService.repository.find({
      select: ["id", "name", "phone"],
      where: { id: In(data.map(item => item.uid)) }
    });
    let data1: any = data;
    data1.forEach(item => {
      const u = user.find(userItem => userItem.id === item.uid);
      item.name = u.name;
      if (power.mApprove) item.phone = u.phone;
      item.coverImg = item.coverImg.toString();
      item.content = item.content.toString();
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
    });
    
    return Result.success(MsgConst.post.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
  
  /**
   * 帖子获取封面图业务逻辑处理
   * 
   * @param postGetCoverImgDto 帖子获取封面图DTO
   * @returns Result
   */
  async getCoverImg(postGetCoverImgDto: PostGetCoverImgDto) {
    if (!(await PowerService.get(postGetCoverImgDto)).uPost) return Result.fail(MsgConst.powerLowE);

    const post = await PostService.repository.findOne({
      select: ['coverImg'],
      where: { id: postGetCoverImgDto.body.id }
    });
    if (post == null) return Result.fail(MsgConst.idNotExistE);

    return Result.success(MsgConst.post.getCoverImg + MsgConst.success, post.coverImg.toString());
  }
  
  /**
   * 帖子获取内容业务逻辑处理
   *  
   * @param postGetContentDto 帖子获取内容DTO
   * @returns Result
   */
  async getContent(postGetContentDto: PostGetContentDto) {
    if (!(await PowerService.get(postGetContentDto)).uPost) return Result.fail(MsgConst.powerLowE);

    const post = await PostService.repository.findOne({
      select: ['content'],
      where: { id: postGetContentDto.body.id }
    });
    if (post == null) return Result.fail(MsgConst.idNotExistE);

    return Result.success(MsgConst.post.getContent + MsgConst.success, post.content.toString());
  }
}
