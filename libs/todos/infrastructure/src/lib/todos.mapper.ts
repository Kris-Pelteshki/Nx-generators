import { Injectable } from '@nestjs/common';
import { IMapper } from '@nx-repo/utils-domain-design';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoMapper implements IMapper<Todo, Todo> {
  toDomain(raw: Todo): Todo {
    throw new Error('Method not implemented.');
  }
  toPersistence(entity: Todo): Todo {
    throw new Error('Method not implemented.');
  }
}
