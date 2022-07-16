import { Injectable } from '@nestjs/common';
import { IMapper } from '@nx-repo/core';
import { User } from '@prisma/client';

@Injectable()
export class UsersMapper implements IMapper<User, User> {
  toDomain(raw: User): User {
    throw new Error('Method not implemented.');
  }
  toPersistence(entity: User): User {
    throw new Error('Method not implemented.');
  }
}
