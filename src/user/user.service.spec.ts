import { Test, TestingModule } from '@nestjs/testing';

import {
  mockCreateUserParams,
  mockListUserParams,
  mockUpdateUserParams,
  mockCreateUserResult,
} from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const UserRepositorySpy = {
  create: jest.fn().mockReturnValue(Promise.resolve()),
  list: jest
    .fn()
    .mockReturnValue(
      Promise.resolve([mockCreateUserResult(), mockCreateUserResult()]),
    ),
  update: jest.fn().mockReturnValue(Promise.resolve(mockCreateUserResult())),
  remove: jest.fn().mockReturnValue(Promise.resolve()),
};

describe('UserService', () => {
  let sut: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: UserRepositorySpy,
        },
      ],
    }).compile();

    sut = module.get<UserService>(UserService);
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
