import { Module } from '@nestjs/common';

import { SpecialistModule } from './specialist/specialist.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    SpecialistModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
})
export class AppModule {}
