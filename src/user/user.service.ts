import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';

import { ListUserDto } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepository.create(createUserDto);
  }

  async findAll(listUserDto: ListUserDto): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.list(listUserDto);
    const usersWithOutPassword = users.map((user) => {
      const { password, ...restUser } = user;
      return restUser;
    });
    return usersWithOutPassword;
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const [user] = await this.userRepository.list({ id });
    const { password, ...userWithOutPassword } = user;
    return userWithOutPassword;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
