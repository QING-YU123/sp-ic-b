import { Test, TestingModule } from '@nestjs/testing';
import { OutsiderController } from './outsider.controller';
import { OutsiderService } from './outsider.service';

describe('OutsiderController', () => {
  let controller: OutsiderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutsiderController],
      providers: [OutsiderService],
    }).compile();

    controller = module.get<OutsiderController>(OutsiderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
