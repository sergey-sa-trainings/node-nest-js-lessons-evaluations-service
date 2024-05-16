import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import User from '../user.entity';
import mockedUser from './user.mock';

describe('UsersService', () => {
  let usersService: UsersService;
  let createUser: jest.Mock;
  let saveUser: jest.Mock;
  let userData: User;
  beforeEach(async () => {
    userData = mockedUser;
    createUser = jest.fn().mockResolvedValue(userData);
    saveUser = jest.fn().mockResolvedValue(undefined);
    const usersRepository = {
      create: createUser,
      save: saveUser,
    };
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();
    usersService = await module.get(UsersService);
  });

  describe('Create user', () => {
    describe('User is registered', () => {
      beforeEach(() => {
        createUser.mockResolvedValue(userData);
        saveUser.mockResolvedValue(undefined);
      });
      it('Should return the user', async () => {
        const newUser = await usersService.createUser({
          name: 'Джонни',
          email: 'silverHand5@mail.com',
          password: '1234567',
        });
        expect(newUser).toBe(userData);
      });
    });
  });
});
