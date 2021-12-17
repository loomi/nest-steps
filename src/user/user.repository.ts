import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { User, roleTypeArray } from './entities/user.entity';

import { ListUserDto } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RepositoryException } from '../shared/errors/repository.exception';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<void> {
    try {
      this.users.push({
        id: uuid(),
        ...createUserDto,
      });
    } catch (error) {
      console.log(error);
      throw new RepositoryException('User', 'unable to create user');
    }
  }

  async list(listUserDto: ListUserDto): Promise<User[]> {
    try {
      const users = this.users.filter((user) => {
        if (
          (!listUserDto.id || user.id === listUserDto.id) &&
          (!listUserDto.email || user.email === listUserDto.email) &&
          (!listUserDto.role || roleTypeArray.includes(listUserDto.role)) &&
          (!listUserDto.aboutMe ||
            user.aboutMe.includes(listUserDto.aboutMe)) &&
          (!listUserDto.name || user.name.includes(listUserDto.name))
        ) {
          return true;
        }
        return false;
      });
      return users;
    } catch (error) {
      throw new RepositoryException('User', 'unable to find user');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userIndex = this.users.findIndex((user) => user.id === id);
      if (userIndex >= 0) {
        if (updateUserDto.name) this.users[userIndex].name = updateUserDto.name;
        if (updateUserDto.role) this.users[userIndex].role = updateUserDto.role;
        if (updateUserDto.aboutMe)
          this.users[userIndex].aboutMe = updateUserDto.aboutMe;
        if (updateUserDto.password)
          this.users[userIndex].password = updateUserDto.password;
      }

      return this.users[userIndex];
    } catch (error) {
      throw new RepositoryException('User', 'unable to update user');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const userIndex = this.users.findIndex((user) => user.id === id);
      if (userIndex >= 0) {
        this.users.splice(userIndex, 1);
      }
    } catch (error) {
      throw new RepositoryException('User', 'unable to delete user');
    }
  }
}
