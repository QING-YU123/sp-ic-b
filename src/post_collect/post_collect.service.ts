import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCollect } from './entities/post_collect.entity';
import { In, Repository } from 'typeorm';
import { PostCollectCreateDto } from './dtos/post_collect.create.dto';
import { PowerService } from 'src/power/power.service';
import { MsgConst } from 'src/.const/msg.const';
import { Result } from 'src/.dtos/result';
import { PostService } from 'src/post/post.service';
import { PostCollectDeleteDto } from './dtos/post_collect.delete.dto';
import { PostCollectQueryListDto } from './dtos/post_collect.query_list.dto';
import { TimeTool } from 'src/.tools/time.tool';

/**
 * 帖子收藏模块服务层
 */
@Injectable()
export class PostCollectService {
  /**
   * 帖子收藏模块数据层
   */
  static repository: Repository<PostCollect>;
  constructor(@InjectRepository(PostCollect) repository: Repository<PostCollect>) { 
    PostCollectService.repository = repository;
  }
  
  /**
   * 帖子收藏记录创建业务逻辑处理
   * 
   * @param postCollectCreateDto 帖子收藏记录创建DTO
   * @returns Result
   */
  async create(postCollectCreateDto: PostCollectCreateDto) {
    if (!(await PowerService.get(postCollectCreateDto)).uCollect) return Result.fail(MsgConst.powerLowE);
    if ((await PostCollectService.repository.countBy({
      pid: postCollectCreateDto.body.pid,
      uid: postCollectCreateDto.checkingUid
    })) == 1) return Result.fail(MsgConst.operateFail);

    const postLike = await PostCollectService.repository.save({
      uid: postCollectCreateDto.checkingUid,
      pid: postCollectCreateDto.body.pid
    });
    if(postLike != null) PostService.repository.update(postCollectCreateDto.body.pid, { collectNum: () => "collectNum + 1" });

    return Result.isOrNot(postLike != null, MsgConst.postCollect.create);
  }
  
  /**
   * 帖子收藏记录删除业务逻辑处理
   * 
   * @param postCollectDeleteDto 帖子收藏记录删除DTO
   * @returns Result
   */
  async delete(postCollectDeleteDto: PostCollectDeleteDto) {
    if (!(await PowerService.get(postCollectDeleteDto)).uCollect) return Result.fail(MsgConst.powerLowE);

    const res = await PostCollectService.repository.delete({
      pid: postCollectDeleteDto.body.pid,
      uid: postCollectDeleteDto.checkingUid
    });
    if(res.affected == 1) PostService.repository.update(postCollectDeleteDto.body.pid, { collectNum: () => "collectNum - 1" });

    return Result.isOrNot(res.affected == 1, MsgConst.postCollect.delete);
  }
  
  /**
   * 帖子收藏记录查询业务逻辑处理
   * 
   * @param postCollectQueryDto 帖子收藏记录查询DTO
   * @returns Result
   */
  async query(postCollectQueryDto: PostCollectDeleteDto) {
    if (!(await PowerService.get(postCollectQueryDto)).uCollect) return Result.fail(MsgConst.powerLowE);

    const res = await PostCollectService.repository.countBy({
      pid: postCollectQueryDto.body.pid,
      uid: postCollectQueryDto.checkingUid
    });

    return Result.success(MsgConst.postCollect.query + MsgConst.success, res == 1);
  }
  
  /**
   * 帖子收藏记录列表查询业务逻辑处理
   * 
   * @param postCollectQueryListDto 帖子收藏记录列表查询DTO
   * @returns Result
   */
  async queryList(postCollectQueryListDto: PostCollectQueryListDto) {
    if (!(await PowerService.get(postCollectQueryListDto)).uCollect) return Result.fail(MsgConst.powerLowE);

    let [data, total] = await PostCollectService.repository.findAndCount({
      skip: (postCollectQueryListDto.body.pageIndex - 1) * postCollectQueryListDto.body.pageSize,
      take: postCollectQueryListDto.body.pageSize,
      where: {
        uid: postCollectQueryListDto.checkingUid
      },
      order: {
        id: "DESC"
      }
    });
    const post = await PostService.repository.find({ where: { id: In(data.map(item => item.pid)) } });
    let data1: any = data;
    data1.forEach(item => {
      const p = post.find(postItem => postItem.id == item.pid);
      item.post = p;
      if (item.post != null) {
        item.post.coverImg = item.post.coverImg.toString();
        item.post.content = item.post.content.toString();
        item.post.createdTime = TimeTool.convertToDate(item.post.createdTime);
        item.post.updatedTime = TimeTool.convertToDate(item.post.updatedTime);
      }
      item.createdTime = TimeTool.convertToDate(item.createdTime);
      item.updatedTime = TimeTool.convertToDate(item.updatedTime);
    });

    return Result.success(MsgConst.postCollect.query + MsgConst.success, {
      data: data,
      total: total
    });
  }
}
