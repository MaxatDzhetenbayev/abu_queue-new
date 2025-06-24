import { ApiProperty } from '@nestjs/swagger'

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Вы успешно зарегистрировались. Пожалуйста, подтвердите ваш email. Ссылка отправлена на указанный адрес.',
    example: 'Вы успешно зарегистрировались. Пожалуйста, подтвердите ваш email. Ссылка отправлена на указанный адрес.'
  })
  message: string
}