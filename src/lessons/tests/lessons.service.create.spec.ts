import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LessonsService } from '../lessons.service';
import mockedLesson from './lesson.mock';
import Lesson from '../lesson.entity';

describe('LessonsService', () => {
  let lessonsService: LessonsService;
  let createLesson: jest.Mock;
  let saveLesson: jest.Mock;
  let lessonData: Lesson;
  beforeEach(async () => {
    lessonData = mockedLesson;
    createLesson = jest.fn().mockResolvedValue(lessonData);
    saveLesson = jest.fn().mockResolvedValue(undefined);
    const lessonsRepository = {
      create: createLesson,
      save: saveLesson,
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

  describe('Create lesson', () => {
    describe('Lesson is registered', () => {
      beforeEach(() => {
        createLesson.mockResolvedValue(lessonData);
        saveLesson.mockResolvedValue(undefined);
      });
      it('Should return the lesson', async () => {
        const newLesson = await lessonsService.createLesson({
          name: 'Музыка',
          code: 'music',
        });
        expect(newLesson).toBe(lessonData);
      });
    });
  });
});
