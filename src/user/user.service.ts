import { Injectable } from '@nestjs/common';

import { User } from "./entities/user.entity";
import { ListUserDto } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto): Promise<void>  {
    throw Error('Not implemented yet');
  }

  findAll(listUserDto: ListUserDto): Promise<User[]> {
    throw Error('Not implemented yet');
  }

  findOne(id: string): Promise<User> {
    throw Error('Not implemented yet');
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    throw Error('Not implemented yet');
  }

  remove(id: string): Promise<void> {
    throw Error('Not implemented yet');
  }
}
