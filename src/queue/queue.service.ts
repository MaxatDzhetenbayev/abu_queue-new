import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { QueueStatus } from 'generated/prisma';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQueueDto) {
    const { disciplineId } = dto;

    // 1. Проверка дисциплины
    const discipline = await this.prisma.discipline.findUnique({
      where: { id: disciplineId },
    });

    if (!discipline) {
      throw new NotFoundException('Дисциплина не найдена');
    }

    // 2. Получение всех активных специалистов с количеством очередей в статусе WAITING
    const specialists = await this.prisma.specialist.findMany({
      where: {
        isAvailable: true,
      },
      include: {
        queues: {
          where: {
            status: QueueStatus.WAITING,
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (specialists.length === 0) {
      throw new NotFoundException('Нет доступных специалистов');
    }

    // 3. Находим наименьшую очередь
    const minQueueLength = Math.min(...specialists.map((s) => s.queues.length));

    const leastBusy = specialists.filter(
      (s) => s.queues.length === minQueueLength,
    );

    // 4. Выбираем рандомного из самых свободных
    const selectedSpecialist =
      leastBusy[Math.floor(Math.random() * leastBusy.length)];

    // 5. Создаем запись очереди
    const newQueue = await this.prisma.queue.create({
      data: {
        disciplineId,
        specialistId: selectedSpecialist.id,
        status: QueueStatus.WAITING,
      },
      select: {
        id: true,
      },
    });

    return newQueue;
  }

  async getQueueStatus(queueId: number) {
    // 1. Получаем саму запись очереди
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
      include: {
        discipline: true,
        specialist: true,
      },
    });

    if (!queue) {
      throw new NotFoundException('Запись в очереди не найдена');
    }

    // 2. Получаем количество людей перед ним в той же очереди (той же дисциплины и специалиста), статус WAITING, созданных раньше
    const aheadInQueue = await this.prisma.queue.count({
      where: {
        specialistId: queue.specialistId,
        status: QueueStatus.WAITING,
        createdAt: {
          lt: queue.createdAt,
        },
      },
    });

    return {
      queueId: queue.id,
      discipline: queue.discipline.name,
      table: queue.specialist?.table,
      status: queue.status,
      position: aheadInQueue + 1,
      peopleAhead: aheadInQueue,
    };
  }

  async callNext(specialistId: string) {
    // 1. Проверка существования специалиста
    const specialist = await this.prisma.specialist.findUnique({
      where: { id: specialistId },
    });

    if (!specialist) {
      throw new NotFoundException('Специалист не найден');
    }

    // 2. Проверка: не вызван ли уже кто-то
    const alreadyCalled = await this.prisma.queue.findFirst({
      where: {
        specialistId,
        status: QueueStatus.CALLED,
      },
    });

    if (alreadyCalled) {
      await this.prisma.queue.update({
        where: { id: alreadyCalled.id },
        data: { status: QueueStatus.COMPLETED },
      });
    }

    // 3. Поиск самого раннего WAITING
    const nextQueue = await this.prisma.queue.findFirst({
      where: {
        specialistId,
        status: QueueStatus.WAITING,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        discipline: true,
      },
    });

    if (!nextQueue) {
      throw new NotFoundException('В очереди никого нет');
    }

    // 4. Обновляем статус на CALLED
    const updated = await this.prisma.queue.update({
      where: { id: nextQueue.id },
      data: {
        status: QueueStatus.CALLED,
      },
    });

    return {
      queueId: updated.id,
      discipline: nextQueue.discipline.name,
      message: 'Абитуриент вызван',
    };
  }

  async getSpecialistQueueStatus(specialistId: string) {
    // 1. Найти текущего вызванного
    const current = await this.prisma.queue.findFirst({
      where: {
        specialistId,
        status: QueueStatus.CALLED,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        discipline: true,
      },
    });

    // 2. Посчитать ожидающих (WAITING)
    const waitingCount = await this.prisma.queue.count({
      where: {
        specialistId,
        status: QueueStatus.WAITING,
      },
    });

    return {
      current: current
        ? {
            id: current.id,
            discipline: current.discipline.name,
            status: current.status,
            startedAt: current.createdAt,
          }
        : null,
      waitingCount,
    };
  }

  async getDisplay() {
    const specialists = await this.prisma.specialist.findMany({
      include: {
        queues: {
          where: {
            status: QueueStatus.CALLED,
          },
        },
      },
    });

    const tableQueues = specialists.map((table) => ({
      table: table.table,
      queue: table.queues[0].id,
    }));

    return tableQueues;
  }
}
