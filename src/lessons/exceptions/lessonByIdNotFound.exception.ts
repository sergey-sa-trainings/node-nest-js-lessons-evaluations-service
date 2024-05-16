import { NotFoundException } from '@nestjs/common';

class LessonByIdNotFoundException extends NotFoundException {
  constructor(lessonId: number) {
    super(`Lesson with id ${lessonId} not found`);
  }
}

export default LessonByIdNotFoundException;
