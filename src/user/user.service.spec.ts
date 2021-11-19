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

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
