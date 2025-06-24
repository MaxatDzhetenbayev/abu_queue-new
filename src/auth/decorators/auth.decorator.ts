import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

/**
 * Декоратор для авторизации пользователей с определенными ролями.
 *
 * Этот декоратор применяет защиту на основе ролей и аутентификации.
 * Если указаны роли, применяется также декоратор Roles.
 *
 */
export function Authorization() {
  return applyDecorators(UseGuards(AuthGuard));
}
