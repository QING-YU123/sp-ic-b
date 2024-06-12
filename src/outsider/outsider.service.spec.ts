import { Test, TestingModule } from '@nestjs/testing';
import { OutsiderService } from './outsider.service';

describe('OutsiderService', () => {
  let service: OutsiderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutsiderService],
    }).compile();

    service = module.get<OutsiderService>(OutsiderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
