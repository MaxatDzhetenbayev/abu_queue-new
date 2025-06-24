import { SpecialistService } from '@/specialist/specialist.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ms, StringValue } from '@/common/libs/ms.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  public constructor(
    private readonly specialistService: SpecialistService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: LoginDto, res: Response) {
    const specialist = await this.specialistService.findByLogin(dto.login);

    if (!specialist || !specialist.password) {
      throw new NotFoundException(
        'Пользователь не найден. Пожалуйста, проверьте введенные данные',
      );
    }

    const isValidPassword = await verify(specialist.password, dto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(
        'Неверный пароль. Пожалуйста, попробуйте еще раз или восстановите пароль, если забыли его.',
      );
    }

    const accessToken = this.jwtService.sign(specialist);

    res.cookie('accessToken', accessToken, {
      httpOnly: this.configService.getOrThrow<boolean>('SESSION_HTTP_ONLY'),
      secure: this.configService.getOrThrow<boolean>('SESSION_SECURE'),
      sameSite: this.configService.getOrThrow<boolean>('SESSION_SAME_SITE'),
      path: '/',
      maxAge: ms(this.configService.getOrThrow<StringValue>('SESSION_MAX_AGE')),
    });

    return res.json({
      message: 'Login successful',
    });
  }

  public async logout(req: Request, res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: this.configService.getOrThrow<boolean>('SESSION_HTTP_ONLY'),
      secure: this.configService.getOrThrow<boolean>('SESSION_SECURE'),
      sameSite: this.configService.getOrThrow<boolean>('SESSION_SAME_SITE'),
      path: '/',
    });

    return { message: 'Logout successful' };
  }
}
