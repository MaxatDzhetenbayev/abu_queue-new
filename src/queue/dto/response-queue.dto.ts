import { ApiProperty } from '@nestjs/swagger';

export class ResponseQueueStatusDto {
  @ApiProperty({
    description: 'Уникальный идентификатор очереди абитуриента',
    example: 'cmca6vqqz0000l1ngjnls3d8q',
  })
  queueId: string;
  @ApiProperty({
    description: 'Название дисциплины',
    example: '6В01101 Педагогика и психология',
  })
  discipline: string;
  @ApiProperty({
    description: 'Номер стола',
    example: '1',
  })
  table: string;
  @ApiProperty({
    description: 'Статус очереди абитуриента',
    example: 'WAITING',
  })
  status: string;
  @ApiProperty({
    description: 'Позиция в очереди',
    example: 1,
  })
  position: number;
  @ApiProperty({
    description: 'Количество людей перед абитуриентом в очереди',
    example: 3,
  })
  peopleAhead: number;
}

class CurrentQueue {
  @ApiProperty({
    description: 'Уникальный идентификатор текущей очереди',
    example: 'cmca6vqqz0000l1ngjnls3d8q',
  })
  id: string;

  @ApiProperty({
    description: 'Название дисциплины текущей очереди',
    example: '6В01101 Педагогика и психология',
  })
  discipline: string;

  @ApiProperty({
    description: 'Статус текущей очереди',
    example: 'WAITING',
  })
  status: string;
}

export class ResponseQueueSpecialistStatusDto {
  @ApiProperty({
    type: () => CurrentQueue,
    nullable: true,
    required: false,
    description:
      'Информация о текущем абитуриенте в статусе CALLED (если есть)',
  })
  current: CurrentQueue | null;

  @ApiProperty({
    description: 'Количество абитуриентов в очереди со статусом WAITING',
    example: 3,
  })
  waitingCount: number;
}

export class ResponseQueueDisplayDto {
  @ApiProperty({
    description: 'Стол из списка',
    example: '3',
  })
  table: string;

  @ApiProperty({
    description: 'Количество абитуриентов в очереди со статусом WAITING',
    example: 102,
  })
  queue: number;
}
