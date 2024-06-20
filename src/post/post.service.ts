import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostCreateDto } from './dtos/post.create.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { PostDeleteDto } from './dtos/post.delete.dto';
import { UserService } from 'src/user/user.service';
import { PostUpdateDto } from './dtos/post.update.dto';
import { PostQueryDto } from './dtos/post.query.dto';

@Injectable()
export class PostService {
  static repository: Repository<Post>;
  constructor(@InjectRepository(Post) repository: Repository<Post>) { 
    PostService.repository = repository;
  }
  
  /**
   * 帖子创建业务逻辑处理
   * 
   * @param postCreateDto 帖子创建数据传输对象
   * @returns Result
   */
  async create(postCreateDto: PostCreateDto) {
    const power = await PowerService.get(postCreateDto)
    if (!power.uPost) return Result.fail(MsgConst.powerLowE);
    if ((await UserService.repository.findOne({
      select: ['banTalk'],
      where: { id: postCreateDto.checkingUid }
    })).banTalk) return Result.fail(MsgConst.userIsBannedTalk);


    postCreateDto.body.uid = postCreateDto.checkingUid;
    postCreateDto.body.status = power.mApprove? 0 : 3;
    const post = PostService.repository.save(postCreateDto.body);
  
    return Result.isOrNot(post != null, MsgConst.post.create);
  }
  
  /**
   * 帖子删除业务逻辑处理
   * 
   * @param postDeleteDto 帖子删除数据传输对象
   * @returns Result
   */
  async delete(postDeleteDto: PostDeleteDto) {
    const power = await PowerService.get(postDeleteDto);
    const post = await PostService.repository.findOne({ select: ['uid'], where: { id: postDeleteDto.body.id } });
    
    let result: any;
    if (postDeleteDto.checkingUid == post.uid) {
      result = await PostService.repository.update(postDeleteDto.body.id, { status: 2 });
    }
    else {
      if (!(await PowerService.get(postDeleteDto)).mApprove) return Result.fail(MsgConst.powerLowE);
      result = await PostService.repository.update(postDeleteDto.body.id, { status: 1 });
    }

    return Result.isOrNot(result.affected == 1, MsgConst.post.delete);
  }
  
  /**
   * 帖子更新业务逻辑处理
   * 
   * @param postDeleteDto 帖子更新数据传输对象
   * @returns Result
   */
  async update(postDeleteDto: PostUpdateDto) {
    if (!(await PowerService.get(postDeleteDto)).mApprove) return Result.fail(MsgConst.powerLowE);

    const res = await PostService.repository.update(postDeleteDto.body.id,
      { status: postDeleteDto.body.approved? 0 : 1 });

    return Result.isOrNot(res.affected == 1, MsgConst.post.update);
  }
  
  /**
   * 帖子查询业务逻辑处理
   * 
   * @param postQueryDto 帖子查询数据传输对象
   * @returns Result
   */
  async query(postQueryDto: PostQueryDto) {
    const power = await PowerService.get(postQueryDto)
    if (!power.uPost) return Result.fail(MsgConst.powerLowE);
    if (!power.mApprove) postQueryDto.body.approved = true;

    const [data, total] = await PostService.repository.findAndCount({
      skip: (postQueryDto.body.pageIndex - 1) * postQueryDto.body.pageSize,
      take: postQueryDto.body.pageSize,
      order: {
        id: 'DESC'
      },
      where: {
        status: postQueryDto.body.approved? 0 : 3,
      }
    });
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
    });
    
    return Result.success(MsgConst.post.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
