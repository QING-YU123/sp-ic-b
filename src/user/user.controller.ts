import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { OutsiderService } from 'src/outsider/outsider.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  async create() { 
    
  }
  
  @Post('query')
  async query() { 
    //return await OutsiderService.repository.find();

    //return await this.userService.query();
  }
}
