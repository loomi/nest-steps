import { Injectable } from '@nestjs/common';

import { UserInfoRepository } from './user-info.repository';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';

import { User } from './entities/user.entity';
import { ListUserDto } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ServiceException } from '../shared/errors/service.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly firebaseService: FirebaseAdminService,
    private readonly userInfoRepository: UserInfoRepository,
  ) {}

  async create({ email, password, ...userInfo }: CreateUserDto): Promise<void> {
    const [userAlreadyExists] = await this.firebaseService.findAll({ email });
    if (userAlreadyExists) {
      throw new ServiceException('User', 'Esse email já está em uso.');
    }

    const user = await this.firebaseService.create({ email, password });

    return this.userInfoRepository.create({
      userId: user.id,
      ...userInfo,
    });
  }

  async findAll(listUserDto: ListUserDto): Promise<Omit<User, 'password'>[]> {
    const { id, email, ...restListUserDto } = listUserDto;

    const users: User[] = await this.firebaseService.findAll({
      id,
      email,
    });
    const usersInfo = await this.userInfoRepository.list(restListUserDto);

    users.forEach((user) => {
      user.userInfo = usersInfo.find((userInfo) => userInfo.userId === user.id);
    });

    return users;
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const { id: userId, email } = await this.firebaseService.findOne(id);
    const [userInfo] = await this.userInfoRepository.list({ id });

    return {
      id,
      email,
      userInfo,
    };
  }

  async update(
    id: string,
    { email, password, ...userInfo }: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    await this.userInfoRepository.update(id, userInfo);
    const user = await this.findOne(id);
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.firebaseService.remove(id);
    await this.userInfoRepository.delete(id);
  }

  async verifyToken(token: string): Promise<User> {
    const userId = await this.firebaseService.verifyIdToken(token);
    const user = await this.findOne(userId);
    return user;
  }
}
