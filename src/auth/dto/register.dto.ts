import { IsDateString, IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class RegisterDoctorDto {
  @ApiProperty({
    description: 'Email врача',
    example: 'doctor@example.com',
    minLength: 5,
    maxLength: 60
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  @Length(5, 60, { message: 'Не меньше 5 и не больше 60 символов' })
  readonly email: string

  @ApiProperty({
    description: 'Пароль врача',
    example: 'DoctorSecurePass123!',
    minLength: 5,
    maxLength: 60,
    format: 'password'
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 60, { message: 'Не меньше 5 и не больше 60 символов' })
  readonly password: string

  @ApiProperty({
    description: 'Имя врача',
    example: 'Александр',
    minLength: 3,
    maxLength: 25
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 25, { message: 'Не меньше 3 и не больше 25 символов' })
  readonly firstName: string

  @ApiProperty({
    description: 'Фамилия врача',
    example: 'Сидоров',
    minLength: 3,
    maxLength: 60
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 60, { message: 'Не меньше 3 и не больше 60 символов' })
  readonly lastName: string

  @ApiProperty({
    description: 'Место работы/клиника врача',
    example: 'Городская больница №1, Кардиологическое отделение',
    minLength: 3,
    maxLength: 60
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 60, { message: 'Не меньше 3 и не больше 60 символов' })
  readonly workplace: string

  /*
   @ApiPropertyOptional({
   description: 'Роли врача',
   enum: UserRole,
   isArray: true,
   example: [UserRole.DOCTOR],
   default: [UserRole.DOCTOR]
   })
   @IsOptional()
   @IsArray({ message: 'Роли должны быть массивом' })
   @ArrayNotEmpty({ message: 'Массив ролей не может быть пустым' })
   @ArrayUnique({ message: 'Роли должны быть уникальными' })
   @IsEnum(UserRole, { each: true, message: 'Недопустимая роль' })
   readonly roles?: UserRole[]
   */
}

export class RegisterPatientDto {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'patient@example.com',
    minLength: 5,
    maxLength: 60
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  @Length(5, 60, { message: 'Не меньше 5 и не больше 60 символов' })
  readonly email: string

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'SecurePassword123!',
    minLength: 5,
    maxLength: 60
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 60, { message: 'Не меньше 5 и не больше 60 символов' })
  readonly password: string

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
    minLength: 3,
    maxLength: 25
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 25, { message: 'Не меньше 3 и не больше 25 символов' })
  readonly firstName: string

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Петров',
    minLength: 3,
    maxLength: 60
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 60, { message: 'Не меньше 3 и не больше 60 символов' })
  readonly lastName: string

  @ApiPropertyOptional({
    description: 'Дата рождения в формате YYYY-MM-DD',
    example: '2002-09-18',
    type: Date
  })
  @IsOptional()
  @IsDateString({}, { message: 'Неверный формат даты. Ожидается ISO-строка' })
  readonly dateOfBirth: string

  @ApiPropertyOptional({
    description: 'Индивидуальный идентификационный номер (12 цифр)',
    example: '123456789012',
    pattern: '^\\d{12}$'
  })
  @IsOptional()
  @Matches(/^\d{12}$/, { message: 'ИИН должен состоять из 12 цифр' })
  readonly iin: string
}