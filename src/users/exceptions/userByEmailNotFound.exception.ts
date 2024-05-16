import { NotFoundException } from '@nestjs/common';

class UserByEmailNotFoundException extends NotFoundException {
  constructor(email: string) {
    super(`User with email ${email} not found`);
  }
}

export default UserByEmailNotFoundException;
