import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import User from '../user.entity';
import mockedUsers from './users.mock';

describe('UsersService', () => {
  let usersService: UsersService;
  let findAll: jest.Mock;
  let usersData: User[];
  beforeEach(async () => {
    usersData = mockedUsers;
    findAll = jest.fn().mockResolvedValue(usersData);
    const usersRepository = {
      find: findAll,
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

  describe('Get all users', () => {
    describe('Users exist', () => {
      beforeEach(() => {
        findAll.mockResolvedValue(usersData);
      });
      it('Should return users', async () => {
        const fetchedUsers = await usersService.getAllUsers();
        expect(fetchedUsers).toBe(usersData);
      });
    });
  });
});
