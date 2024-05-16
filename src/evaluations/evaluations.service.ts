import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateEvaluationDto from './dto/createEvaluation.dto';
import Evaluation from './evaluation.entity';
import { UsersService } from '../users/users.service';
import { LessonsService } from '../lessons/lessons.service';

@Injectable()
export class EvaluationsService {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly usersService: UsersService,
    @InjectRepository(Evaluation)
    private evaluationsRepository: Repository<Evaluation>,
  ) {}

  async createEvaluation(lessonId: number, evaluation: CreateEvaluationDto) {
    const lesson = await this.lessonsService.getLessonById(lessonId);
    const user = await this.usersService.getUserById(evaluation.user_id);

    const newEvaluation = this.evaluationsRepository.create({
      lesson,
      user,
      ...evaluation,
    });
    await this.evaluationsRepository.save(newEvaluation);
    evaluation.id = newEvaluation.id;
    return evaluation;
  }
}
