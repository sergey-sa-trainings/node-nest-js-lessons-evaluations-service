import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationParams } from '../utils/types/paginationParams';
import JwtAuthGuard from '../auth/jwtAuth.guard';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateUserDto from './dto/createUser.dto';

@ApiTags('users')
@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение списка пользователей' })
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
    description: 'Список пользователей успешно получен',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Query() { offset, limit }: PaginationParams) {
    return this.usersService.getAllUsers(offset, limit);
  }

  @ApiOperation({ summary: 'Создание нового пользователя' })
  @ApiBody({
    type: CreateUserDto,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка валидации входных данных / Пользователь с таким email уже существует',
  })
  @ApiResponse({
    status: 500,
    description: 'Непредвиденная ошибка',
  })
  @Post()
  async register(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
