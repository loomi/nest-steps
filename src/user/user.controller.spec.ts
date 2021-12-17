import { Test, TestingModule } from '@nestjs/testing';

import {
  mockCreateUserParams,
  mockListUserParams,
  mockUpdateUserParams,
  mockCreateUserResult,
} from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

const UserServiceSpy = {
  create: jest.fn().mockReturnValue(Promise.resolve()),
  findAll: jest
    .fn()
    .mockReturnValue(
      Promise.resolve([mockCreateUserResult(), mockCreateUserResult()]),
    ),
  findOne: jest.fn().mockReturnValue(Promise.resolve(mockCreateUserResult())),
  update: jest.fn().mockReturnValue(Promise.resolve(mockCreateUserResult())),
  remove: jest.fn().mockReturnValue(Promise.resolve()),
};

describe('UserController', () => {
  let sut: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: UserServiceSpy,
        },
      ],
    }).compile();

    sut = module.get<UserController>(UserController);
  });

  describe('create user', () => {
    it('should be defined', () => {
      expect(sut.create).toBeDefined();
    });
  });

  describe('find user', () => {
    it('should be defined', () => {
      expect(sut.findAll).toBeDefined();
      expect(sut.findOne).toBeDefined();
    });
  });

  describe('update user', () => {
    it('should be defined', () => {
      expect(sut.update).toBeDefined();
    });
  });

  describe('delete user', () => {
    it('should be defined', () => {
      expect(sut.remove).toBeDefined();
    });
  });
});
