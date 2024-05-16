import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LessonsService } from '../lessons.service';
import Lesson from '../lesson.entity';
import mockedLesson from './lesson.mock';

describe('LessonsService', () => {
  let lessonsService: LessonsService;
  let findLesson: jest.Mock;
  let lessonData: Lesson;
  beforeEach(async () => {
    lessonData = mockedLesson;
    findLesson = jest.fn().mockResolvedValue(lessonData);
    const lessonsRepository = {
      findOne: findLesson,
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

  describe('Get lesson by id', () => {
    describe('Lesson is found', () => {
      beforeEach(() => {
        findLesson.mockResolvedValue(lessonData);
      });
      it('Should return the lesson', async () => {
        const fetchedLesson = await lessonsService.getLessonById(0);
        expect(fetchedLesson).toBe(lessonData);
      });
    });
    describe('Lesson is not found', () => {
      beforeEach(() => {
        findLesson.mockResolvedValue(undefined);
      });
      it('Should throw an NotFoundException', async () => {
        await expect(lessonsService.getLessonById(0)).rejects.toThrow(
          `Lesson with id 0 not found`,
        );
      });
    });
  });
});
