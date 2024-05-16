import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import UserByIdNotFoundException from './exceptions/userByIdNotFound.exception';
import UserByEmailNotFoundException from './exceptions/userByEmailNotFound.exception';
import CreateUserDto from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/postgresErrorCodes.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(offset?: number, limit?: number) {
    const items = await this.usersRepository.find({
      order: {
        name: 'ASC',
      },
      skip: offset,
      take: limit,
    });

    return items;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    throw new UserByIdNotFoundException(id);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return user;
    }
    throw new UserByEmailNotFoundException(email);
  }

  async createUser(user: CreateUserDto) {
    user.email = user.email.toLowerCase();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
      const newUser = this.usersRepository.create({
        ...user,
        password: hashedPassword,
      });
      await this.usersRepository.save(newUser);
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
