import { NotFoundException } from '@nestjs/common';

class UserByIdNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(`User with id ${userId} not found`);
  }
}

export default UserByIdNotFoundException;
