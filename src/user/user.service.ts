import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    static repository: Repository<User>;
    constructor(@InjectRepository(User) repository: Repository<User>) { 
        UserService.repository = repository;
    }
}
