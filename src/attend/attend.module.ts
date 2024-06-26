import { Module } from '@nestjs/common';
import { AttendService } from './attend.service';
import { AttendController } from './attend.controller';
import { Attend } from './entities/attend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Attend])],
  controllers: [AttendController],
  providers: [AttendService],
})
export class AttendModule {}
