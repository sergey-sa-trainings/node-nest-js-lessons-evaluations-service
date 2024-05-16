import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Evaluation from './evaluation.entity';
import { EvaluationsController } from './evaluations.controller';
import { EvaluationsService } from './evaluations.service';
import { LessonsModule } from '../lessons/lessons.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [LessonsModule, UsersModule, TypeOrmModule.forFeature([Evaluation])],
  controllers: [EvaluationsController],
  providers: [EvaluationsService],
})
export class EvaluationsModule {}
