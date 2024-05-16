import { Req, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './localAuth.guard';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthGuard from './jwtAuth.guard';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import LogInDto from './dto/logIn.dto';

@ApiTags('authentication')
@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({
    type: LogInDto,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно авторизован',
  })
  @ApiResponse({
    status: 400,
    description: 'Не верные учетные данные',
  })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    request.res.setHeader('Set-Cookie', [accessTokenCookie]);

    return user;
  }

  @ApiOperation({ summary: 'Деавторизация пользователя' })
  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно деавторизован',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  }
}
