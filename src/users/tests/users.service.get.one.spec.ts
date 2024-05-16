import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import User from '../user.entity';
import mockedUser from './user.mock';

describe('UsersService', () => {
  let usersService: UsersService;
  let findUser: jest.Mock;
  let userData: User;
  beforeEach(async () => {
    userData = mockedUser;
    findUser = jest.fn().mockResolvedValue(userData);
    const usersRepository = {
      findOne: findUser,
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

  describe('Get user by email', () => {
    describe('User is found', () => {
      beforeEach(() => {
        findUser.mockResolvedValue(userData);
      });
      it('Should return the user', async () => {
        const fetchedUser = await usersService.getUserByEmail(
          'Silverhand@cyber.punk',
        );
        expect(fetchedUser).toBe(userData);
      });
    });
    describe('User is not found', () => {
      beforeEach(() => {
        findUser.mockResolvedValue(undefined);
      });
      it('Should throw an NotFoundException', async () => {
        await expect(
          usersService.getUserByEmail('Silverhand@cyber.punk'),
        ).rejects.toThrow(`User with email Silverhand@cyber.punk not found`);
      });
    });
  });

  describe('Get user by id', () => {
    describe('User is found', () => {
      beforeEach(() => {
        findUser.mockResolvedValue(userData);
      });
      it('Should return the user', async () => {
        const fetchedUser = await usersService.getUserById(0);
        expect(fetchedUser).toBe(userData);
      });
    });
    describe('User is not found', () => {
      beforeEach(() => {
        findUser.mockResolvedValue(undefined);
      });
      it('Should throw an NotFoundException', async () => {
        await expect(usersService.getUserById(0)).rejects.toThrow(
          `User with id 0 not found`,
        );
      });
    });
  });
});
