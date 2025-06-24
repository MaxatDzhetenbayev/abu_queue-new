import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@ApiTags('Auth - Аутентификация и управление доступом')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Аутентификация пользователя',
    description: 'Вход в систему',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Успешная аутентификация',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Некорректные данные в запросе' })
  @ApiUnauthorizedResponse({ description: 'Неверные учетные данные' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Res() res: Response, @Body() dto: LoginDto) {
    return this.authService.login(dto, res);
  }

  @ApiOperation({
    summary: 'Выход из системы',
    description:
      'Завершение сеанса пользователя и очистка аутентификационных данных',
  })
  @ApiResponse({ status: 200, description: 'Успешный выход из системы' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(req, res);
  }
}
