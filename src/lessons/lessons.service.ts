import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateLessonDto from './dto/createLesson.dto';
import Lesson from './lesson.entity';
import LessonByIdNotFoundException from './exceptions/lessonByIdNotFound.exception';
import PostgresErrorCode from '../database/postgresErrorCodes.enum';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) {}

  async getAllLessons(offset?: number, limit?: number) {
    const items = await this.lessonsRepository.find({
      relations: {
        evaluations: {
          user: true,
        },
      },
      order: {
        name: 'ASC',
      },
      skip: offset,
      take: limit,
    });

    return items;
  }

  async getLessonById(id: number) {
    const lesson = await this.lessonsRepository.findOne({
      where: {
        id,
      },
    });

    if (lesson) {
      return lesson;
    }
    throw new LessonByIdNotFoundException(id);
  }

  async createLesson(lesson: CreateLessonDto) {
    lesson.code = lesson.code.toLowerCase();
    try {
      const newLesson = this.lessonsRepository.create({
        ...lesson,
      });
      await this.lessonsRepository.save(newLesson);
      return newLesson;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'Lesson with that code already exists',
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
