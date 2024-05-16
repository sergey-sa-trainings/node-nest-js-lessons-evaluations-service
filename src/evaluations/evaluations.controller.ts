import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import CreateEvaluationDto from './dto/createEvaluation.dto';
import JwtAuthGuard from '../auth/jwtAuth.guard';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('evaluations')
@Controller({
  version: '1',
  path: 'lessons',
})
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @ApiOperation({ summary: 'Проставление оценки за занятие' })
  @ApiCookieAuth()
  @ApiParam({
    name: 'lesson_id',
    required: true,
    description: 'Занятие, по которому проставляется оценка',
    type: Number,
  })
  @ApiBody({
    type: CreateEvaluationDto,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Оценка успешно создана',
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка валидации входных данных',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @Post(':lesson_id/evaluations')
  @UseGuards(JwtAuthGuard)
  async createLesson(
    @Param('lesson_id') lessonId: number,
    @Body() evaluation: CreateEvaluationDto,
  ) {
    return this.evaluationsService.createEvaluation(lessonId, evaluation);
  }
}
