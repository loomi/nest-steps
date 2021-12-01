import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

import { User } from './entities/user.entity';
import { ListUserDto } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async list({ id, email, name, aboutMe }: ListUserDto): Promise<User[]> {
    const users = await this.databaseService.user.findMany({
      where: {
        id,
        email: {
          contains: email,
        },
        name: {
          contains: name,
        },
        aboutMe: {
          contains: aboutMe,
        },
      },
    });
    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.databaseService.user.delete({
      where: { id },
    });
  }
}
