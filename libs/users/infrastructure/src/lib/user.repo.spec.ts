import { Test } from '@nestjs/testing';
import { UserRepo } from './user.repo';

describe('UserRepo', () => {
  let repo: UserRepo;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepo],
    }).compile();

    repo = module.get(UserRepo);
  });

  it('should be defined', () => {
    expect(repo).toBeTruthy();
  });
});
