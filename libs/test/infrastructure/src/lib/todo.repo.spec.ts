import { Test } from '@nestjs/testing';
import { TodoRepo } from './todo.repo';

describe('TodoRepo', () => {
  let repo: TodoRepo;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TodoRepo],
    }).compile();

    repo = module.get(TodoRepo);
  });

  it('should be defined', () => {
    expect(repo).toBeTruthy();
  });
});
