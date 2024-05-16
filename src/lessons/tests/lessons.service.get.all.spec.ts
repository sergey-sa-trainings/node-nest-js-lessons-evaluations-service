import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LessonsService } from '../lessons.service';
import Lesson from '../lesson.entity';
import mockedLessons from './lessons.mock';

describe('LessonsService', () => {
  let lessonsService: LessonsService;
  let findAll: jest.Mock;
  let lessonsData: Lesson[];
  beforeEach(async () => {
    lessonsData = mockedLessons;
    findAll = jest.fn().mockResolvedValue(lessonsData);
    const lessonsRepository = {
      find: findAll,
    };
    const module = await Test.createTestingModule({
      providers: [
        LessonsService,
        {
          provide: getRepositoryToken(Lesson),
          useValue: lessonsRepository,
        },
      ],
    }).compile();
    lessonsService = await module.get(LessonsService);
  });

  describe('Get all lessons', () => {
    describe('Lessons exist', () => {
      beforeEach(() => {
        findAll.mockResolvedValue(lessonsData);
      });
      it('Should return lessons', async () => {
        const fetchedLessons = await lessonsService.getAllLessons();
        expect(fetchedLessons).toBe(lessonsData);
      });
    });
  });
});
