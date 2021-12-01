import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let sut: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
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
