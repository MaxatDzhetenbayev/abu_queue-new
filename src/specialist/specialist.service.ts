import { Injectable, Logger } from '@nestjs/common';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class SpecialistService {
  constructor(private readonly prismaService: PrismaService) {}
  logger = new Logger(SpecialistService.name);

  async findByLogin(login: string) {
    return this.prismaService.specialist.findUnique({
      where: {
        login,
      },
    });
  }

  async create(createSpecialistDto: CreateSpecialistDto) {
    try {
      const specialist = await this.prismaService.specialist.create({
        data: {
          ...createSpecialistDto,
          password: await hash(createSpecialistDto.password),
          isAvailable: true,
        },
      });

      if (!specialist) {
        throw new Error('Не удалось создать специалиста');
      }

      return {
        message: 'Специалист успешно создан',
        specialist: {
          id: specialist.id,
          login: specialist.login,
          table: specialist.table,
          isAvailable: specialist.isAvailable,
        },
      };
    } catch (error) {
      this.logger.error('Ошибка при создании специалиста:', error);
      throw new Error(`Ошибка при создании специалиста: ${error.message}`);
    }
  }
}
