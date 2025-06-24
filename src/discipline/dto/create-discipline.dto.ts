import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDisciplineDto {
  @ApiProperty({
    description: 'Уникальное имя дисциплины',
    example: '6В01101 Педагогика и психология',
    minLength: 5,
    maxLength: 60,
  })
  @IsString({ message: 'Поле name должен быть строкой.' })
  @IsNotEmpty({ message: 'Поле name обязателен для заполнения.' })
  name: string;
}


