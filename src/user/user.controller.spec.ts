import { Test, TestingModule } from '@nestjs/testing';
import * as faker from "faker";

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

const mockCreateUserParams = () => ({
  email: faker.internet.email(),
  name: faker.name.firstName(),
  password: faker.internet.password()
});

const mockListUserParams = () => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.name.firstName(),
});

const mockUpdateUserParams = () => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.name.firstName(),
  password: faker.internet.password()
});

const mockCreateUserResult = (): User => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.name.firstName(),
  password: faker.internet.password()
});

const UserServiceSpy = {
  create: jest.fn().mockReturnValue(Promise.resolve()),
  findAll: jest.fn().mockReturnValue(Promise.resolve([mockCreateUserResult(), mockCreateUserResult()])),
  findOne: jest.fn().mockReturnValue(Promise.resolve(mockCreateUserResult())),
  update: jest.fn().mockReturnValue(Promise.resolve(mockCreateUserResult())),
  remove: jest.fn().mockReturnValue(Promise.resolve()),
}

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: UserServiceSpy,
        }
        
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
