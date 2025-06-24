import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSpecialistDto {
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

  @ApiProperty({
    description: 'Стол специалиста',
    example: 1,
  })
  @IsNotEmpty({ message: 'Поле стол специалиста не может быть пустым.' })
  @IsString({ message: 'Поле стол специалиста должен быть строкой.' })
  table: string;
}
