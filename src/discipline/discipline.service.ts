import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class DisciplineService {
  private readonly logger = new Logger(DisciplineService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(createDisciplineDto: CreateDisciplineDto) {
    this.logger.log('Создание дисциплины', createDisciplineDto);

    try {
      const discipline = await this.prismaService.discipline.create({
        data: createDisciplineDto,
      });

      if (!discipline) {
        this.logger.error('Ошибка при создании дисциплины');
        throw new Error('Ошибка при создании дисциплины');
      }

      this.logger.log('Дисциплина успешно создана', discipline);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      this.logger.error('Ошибка при создании дисциплины', error);
      throw new InternalServerErrorException(
        'Не удалось создать категорию услуги.',
      );
    }
  }
  async findAll() {
    return await this.prismaService.discipline.findMany();
  }

  async findOne(id: string) {
    try {
      this.logger.log(`Получение дисциплины с ID: ${id}`);
      const discipline = await this.prismaService.discipline.findUnique({
        where: {
          id: id,
        },
      });

      if (!discipline) {
        this.logger.warn(`Дисциплина с ID ${id} не найдена.`);
        throw new NotFoundException('Дисциплина не найдена.');
      }

      return discipline;
    } catch (error) {
      this.logger.error(`Ошибка при получении дисциплины: ${error.message}`);
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Не удалось получить дисциплину.');
    }
  }

  async update(id: string, updateServiceDto: UpdateDisciplineDto) {
    this.logger.log(`Обновление дисциплины с ID: ${id}`);
    try {
      const updatedServiceCategory = await this.prismaService.discipline.update(
        {
          where: {
            id: id,
          },
          data: updateServiceDto,
        },
      );

      return updatedServiceCategory;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        this.logger.warn(`Дисциплина с ID ${id} не найдена для обновления.`);
        throw new NotFoundException('Дисциплина не найдена.');
      }

      this.logger.error(`Ошибка при обновлении дисциплины: ${error.message}`);
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Не удалось обновить дисциплину.');
    }
  }

  async remove(id: string) {
    this.logger.log(`Удаление дисциплины с ID: ${id}`);
    try {
      const deletedDiscipline = await this.prismaService.discipline.delete({
        where: {
          id: id,
        },
      });

      if (!deletedDiscipline) {
        this.logger.warn(`Дисциплина с ID ${id} не найдена.`);
        throw new NotFoundException('Дисциплина с таким ID не найдена.');
      }

      return deletedDiscipline;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        this.logger.warn(`Дисциплина с ID ${id} не найдена.`);
        throw new NotFoundException('Дисциплина не найдена.');
      }

      this.logger.error(`Ошибка при удалении дисциплины: ${error.message}`);
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException('Не удалось удалить дисциплину.');
    }
  }
}
