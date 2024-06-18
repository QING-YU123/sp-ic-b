import { Injectable } from '@nestjs/common';
import { Parking } from './entities/parking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ParkingCreateDto } from './dtos/parking.create.dto';
import { PowerService } from 'src/power/power.service';
import { Result } from 'src/.dtos/result';
import { MsgConst } from 'src/.const/msg.const';
import { ParkingDeleteDto } from './dtos/parking.delete.dto';
import { ParkingUpdateDto } from './dtos/parking.update.dto';
import { ParkingQueryDto } from './dtos/parking.query.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ParkingService {
  static repository: Repository<Parking>;
  constructor(@InjectRepository(Parking) repository: Repository<Parking>) { 
    ParkingService.repository = repository;
  }

  async create(parkingCreateDto: ParkingCreateDto) {
    if (!(await PowerService.get(parkingCreateDto)).mAdmin0) return Result.fail(MsgConst.powerLowE);
    if (typeof parkingCreateDto.body.id === "undefined") parkingCreateDto.body.id = 0;
    if ((await ParkingService.repository.countBy({ id: parkingCreateDto.body.id })) == 1)
      return Result.fail(MsgConst.idHadExistE);
    
    const res = ParkingService.repository.save(parkingCreateDto.body);

    return Result.isOrNot(res != null, MsgConst.parking.create);
  }

  async delete(parkingDeleteDto: ParkingDeleteDto) {
    if (!(await PowerService.get(parkingDeleteDto)).mAdmin0) return Result.fail(MsgConst.powerLowE);
    
    const res = await ParkingService.repository.delete(parkingDeleteDto.body.id);

    return Result.isOrNot(res.affected != 0, MsgConst.parking.delete);
  }

  async update(parkingUpdateDto: ParkingUpdateDto) {
    if (!(await PowerService.get(parkingUpdateDto)).mParking) return Result.fail(MsgConst.powerLowE);
    const user = await UserService.repository.findOne({ select: ["id"], where: { phone: parkingUpdateDto.body.phone } });
    if (user == null) return Result.fail(MsgConst.userNotExistE);

    const res = await ParkingService.repository.update(parkingUpdateDto.body.id, {
      uid: user.id,
      price: parkingUpdateDto.body.price,
      carNum: parkingUpdateDto.body.carNum
    });

    return Result.isOrNot(res.affected != 0, MsgConst.parking.update);
  }

  async query(parkingQueryDto: ParkingQueryDto) {
    if (!(await PowerService.get(parkingQueryDto)).mParking) return Result.fail(MsgConst.powerLowE);
    
    let [data, total] = await ParkingService.repository.findAndCount({
      skip: (parkingQueryDto.body.pageIndex -1) * parkingQueryDto.body.pageSize,
      take: parkingQueryDto.body.pageSize,
      order: {
        id: "DESC"
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
      item.phone = u.phone;
    });
    
    return Result.success(MsgConst.parking.query + MsgConst.success, {
      data: data,
      total: total
    });
  }

}
