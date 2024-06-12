import { Module } from '@nestjs/common';
import { RepairService } from './repair.service';
import { RepairController } from './repair.controller';
import { Repair } from './entities/repair.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Repair])],
  controllers: [RepairController],
  providers: [RepairService],
})
export class RepairModule {}
