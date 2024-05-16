import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PaginationParams } from '../utils/types/paginationParams';
import { LessonsService } from './lessons.service';
import CreateLessonDto from './dto/createLesson.dto';
import JwtAuthGuard from '../auth/jwtAuth.guard';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('lessons')
@Controller({
  version: '1',
  path: 'lessons',
})
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOperation({
    summary: 'Получение списка занятий с оценками пользователей',
  })
  @ApiCookieAuth()
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Пропустить указанное число строк',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Возвращать не больше заданного числа строк',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Список занятий с оценками пользователей успешно получен',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllLessons(@Query() { offset, limit }: PaginationParams) {
    return this.lessonsService.getAllLessons(offset, limit);
  }

  @ApiOperation({ summary: 'Создание нового занятия' })
  @ApiCookieAuth()
  @ApiBody({
    type: CreateLessonDto,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Занятие успешно создано',
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка валидации входных данных / Занятие с таким code уже существует',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 500,
    description: 'Непредвиденная ошибка',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createLesson(@Body() lesson: CreateLessonDto) {
    return this.lessonsService.createLesson(lesson);
  }
}
