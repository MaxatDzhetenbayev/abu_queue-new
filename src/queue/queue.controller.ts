import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ResponseQueueDisplayDto,
  ResponseQueueSpecialistStatusDto,
  ResponseQueueStatusDto,
} from './dto/response-queue.dto';
import { Authorization } from '@/auth/decorators/auth.decorator';
import { Authorized } from '@/auth/decorators/authorized.decorator';

@ApiTags('Queue - Управление очередями')
@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @ApiOperation({
    summary: 'Создание очереди',
    description: 'Создает запись очереди для определнного стола',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create() {
    return this.queueService.create();
  }

  @ApiOperation({
    summary: 'Получение статуса очереди абитуриента',
    description:
      'Получает статус очереди для определнного абитуриента по ID queue',
  })
  @ApiParam({
    name: 'id',
    description: 'Уникальный идентификатор очереди',
    example: 'cmca6vqqz0000l1ngjnls3d8q',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Статус очереди успешно получен',
    type: ResponseQueueStatusDto,
  })
  @Get('status/:id')
  getQueueStatus(@Param('id') id: string) {
    return this.queueService.getQueueStatus(+id);
  }

  @ApiOperation({
    summary: 'Получение очереди специалиста',
    description: 'Получает статус текущей очереди специалиста',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Статус текущей очереди специалиста успешно получен',
    type: ResponseQueueSpecialistStatusDto,
  })
  @Authorization()
  @Get('specialist/status')
  getQueueSpecialistStatus(@Authorized('id') specialistId: string) {
    return this.queueService.getSpecialistQueueStatus(specialistId);
  }

  @ApiOperation({
    summary: 'Вызов следующего абитуриента',
    description: 'Специалист вызывает следующего в очереди',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        specialistId: { type: 'string', example: 'clzx...' },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('call')
  @Authorization()
  callNext(@Authorized('id') specialistId: string) {
    return this.queueService.callNext(specialistId);
  }

  @ApiOperation({
    summary: 'Отображение списка очереди для столов',
    description: 'Получает список очередей для всех столов',
  })
  @ApiResponse({
    type: ResponseQueueDisplayDto,
    isArray: true,
    status: HttpStatus.OK,
    description: 'Список очередей для столов успешно получен',
  })
  @HttpCode(HttpStatus.OK)
  @Get('display')
  display() {
    return this.queueService.getDisplay();
  }
}
