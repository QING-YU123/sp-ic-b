import { Module } from '@nestjs/common';
import { OutsiderService } from './outsider.service';
import { OutsiderController } from './outsider.controller';
import { Outsider } from './entities/outsider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Outsider])],
  controllers: [OutsiderController],
  providers: [OutsiderService],
})
export class OutsiderModule {}
