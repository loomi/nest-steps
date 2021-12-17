import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { UserInfo, roleTypeArray } from './entities/user-info.entity';

import { ListUserDto } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RepositoryException } from '../shared/errors/repository.exception';

@Injectable()
export class UserInfoRepository {
  private users: UserInfo[] = [];

  async create(
    createUserDto: Omit<CreateUserDto, 'email' | 'password'> & {
      userId: string;
    },
  ): Promise<void> {
    try {
      this.users.push({
        ...createUserDto,
      });
    } catch (error) {
      console.log(error);
      throw new RepositoryException('User', 'unable to create user');
    }
  }

  async list(
    listUserDto: Omit<ListUserDto, 'email' | 'password'>,
  ): Promise<UserInfo[]> {
    try {
      const users = this.users.filter((user) => {
        if (
          (!listUserDto.id || user.userId === listUserDto.id) &&
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

  async update(
    id: string,
    updateUserDto: Omit<UpdateUserDto, 'email' | 'password'>,
  ): Promise<UserInfo> {
    try {
      const userIndex = this.users.findIndex((user) => user.userId === id);
      if (userIndex >= 0) {
        if (updateUserDto.name) this.users[userIndex].name = updateUserDto.name;
        if (updateUserDto.role) this.users[userIndex].role = updateUserDto.role;
        if (updateUserDto.aboutMe)
          this.users[userIndex].aboutMe = updateUserDto.aboutMe;
      }

      return this.users[userIndex];
    } catch (error) {
      throw new RepositoryException('User', 'unable to update user');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const userIndex = this.users.findIndex((user) => user.userId === id);
      if (userIndex >= 0) {
        this.users.splice(userIndex, 1);
      }
    } catch (error) {
      throw new RepositoryException('User', 'unable to delete user');
    }
  }
}
