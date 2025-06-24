import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Specialist } from 'generated/prisma';

/**
 * Декоратор для получения авторизованного пользователя из контекста запроса.
 *
 * Этот декоратор позволяет извлекать данные пользователя из объекта запроса.
 * Если указан параметр, возвращает конкретное свойство пользователя,
 * иначе возвращает весь объект пользователя.
 *
 */
export const Authorized = createParamDecorator(
  (data: keyof Specialist, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
