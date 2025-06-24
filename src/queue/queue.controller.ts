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
import { CreateQueueDto } from './dto/create-queue.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseQueueStatusDto } from './dto/response-queue.dto';
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
  @ApiBody({
    type: CreateQueueDto,
    description: 'Данные для создания очереди',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.create(createQueueDto);
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
    return this.queueService.getQueueStatus(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('call')
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
  @Authorization()
  callNext(@Authorized('id') specialistId: string) {
    return this.queueService.callNext(specialistId);
  }

  // @Get()
  // findAll() {
  //   return this.queueService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.queueService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQueueDto: UpdateQueueDto) {
  //   return this.queueService.update(+id, updateQueueDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.queueService.remove(+id);
  // }
}
