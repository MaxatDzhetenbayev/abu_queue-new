import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'login специалиста',
    example: 'specialist_1',
    minLength: 5,
    maxLength: 60,
  })
  @IsString({ message: 'Поле login должен быть строкой.' })
  @IsNotEmpty({ message: 'Поле login обязателен для заполнения.' })
  login: string;

  @ApiProperty({
    description: 'Пароль специалиста',
    example: 'specialist_password',
    minLength: 5,
    format: 'password',
  })
  @IsString({ message: 'Пароль должен быть строкой.' })
  @IsNotEmpty({ message: 'Поле пароль не может быть пустым.' })
  @MinLength(5, { message: 'Пароль должен содержать не менее 6 символов.' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'ID Пользователя',
  })
  id: number;

  @ApiProperty({
    description: 'login специалиста',
    example: 'specialist_1',
    minLength: 5,
    maxLength: 60,
  })
  @IsString({ message: 'Поле login должен быть строкой.' })
  @IsNotEmpty({ message: 'Поле login обязателен для заполнения.' })
  login: string;

  @ApiProperty({
    description: 'Дата создания специалиста',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления специалиста',
  })
  updatedAt: Date;
}
