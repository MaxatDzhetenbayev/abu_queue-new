import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQueueDto {
  @ApiProperty({
    description: 'Уникальный идентификатор дисциплины',
    example: 'cmca6vqqz0000l1ngjnls3d8q',
  })
  @IsString({ message: 'disciplineId должен быть строкой' })
  @IsNotEmpty({ message: 'disciplineId не должен быть пустым' })
  disciplineId: string;
}
