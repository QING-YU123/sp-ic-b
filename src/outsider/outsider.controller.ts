import { Controller } from '@nestjs/common';
import { OutsiderService } from './outsider.service';

@Controller('outsider')
export class OutsiderController {
  constructor(private readonly outsiderService: OutsiderService) {}
}
