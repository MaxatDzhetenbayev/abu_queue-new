import { ApiProperty } from '@nestjs/swagger';

export class CreateQueueDto {
  @ApiProperty({
    description: 'Уникальный идентификатор дисциплины',
    example: 'cmca6vqqz0000l1ngjnls3d8q',
  })
  disciplineId: string;
}
