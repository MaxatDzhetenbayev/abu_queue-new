import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Discipline - Управление дисциплинами')
@Controller('discipline')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @ApiOperation({
    summary: 'Создание дисциплины',
    description: 'Создает запись дисциплины в системе. ',
  })
  @ApiBody({
    type: CreateDisciplineDto,
    description: 'Данные для создания дисциплины',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createDisciplineDto: CreateDisciplineDto) {
    return this.disciplineService.create(createDisciplineDto);
  }

  @ApiOperation({
    summary: 'Создание дисциплины(множества)',
    description: 'Создает запись дисциплины в системе. ',
  })
  @ApiBody({
    type: CreateDisciplineDto,
    description: 'Данные для создания дисциплины',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/many')
  createMany(@Body() createDisciplineDto: CreateDisciplineDto[]) {
    return this.disciplineService.createMany(createDisciplineDto);
  }

  @ApiOperation({
    summary: 'Получение всех дисциплин',
    description: 'Возвращает список всех дисциплин, доступных в системе.',
  })
  @Get()
  findAll() {
    return this.disciplineService.findAll();
  }

  @ApiOperation({
    summary: 'Получение всех дисциплин клиники',
    description: 'Возвращает список всех дисциплин',
  })
  @ApiParam({
    name: 'disciplineId',
    description: 'ID дисциплины для получения',
    example: 1,
    required: true,
  })
  @Get(':disciplineId')
  findDiscipline(@Param('disciplineId') disciplineId: string) {
    return this.disciplineService.findOne(disciplineId);
  }

  @ApiOperation({
    summary: 'Обновление информации о дисциплине',
    description:
      'Обновляет информацию о дисциплине по ID. Может обновлять только ADMIN',
  })
  @ApiParam({
    name: 'id',
    description: 'ID дисциплины для обновления',
    example: 1,
    required: true,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateDisciplineDto: UpdateDisciplineDto,
  ) {
    return this.disciplineService.update(id, UpdateDisciplineDto);
  }

  @ApiOperation({
    summary: 'Удаление дисциплины',
    description: 'Удаляет дисциплину по ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID дисциплины для удаления',
    example: 1,
    required: true,
  })
  @Delete(':id')
  removeDiscipline(@Param('id') id: string) {
    return this.disciplineService.remove(id);
  }
}
