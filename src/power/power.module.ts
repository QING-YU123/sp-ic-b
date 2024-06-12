import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerController } from './power.controller';
import { Power } from './entities/power.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Power])],
  controllers: [PowerController],
  providers: [PowerService],
})
export class PowerModule {}
