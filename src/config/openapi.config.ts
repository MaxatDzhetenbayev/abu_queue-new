import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

/**
 * Настраивает и публикует OpenAPI-документацию для приложения NestJS с использованием Swagger и Redoc.
 *
 * @param app - Экземпляр приложения NestJS, для которого генерируется документация.
 *
 * @remark
 * Документация доступна по маршруту `/api` с базовой аутентификацией (логин: admin, пароль: 123).
 */
export async function generateOpenAPI(app: INestApplication): Promise<void> {
  const options = new DocumentBuilder()
    .setTitle('ABU QUEUE API')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
  });

  // console.log('Generated OpenAPI JSON:', JSON.stringify(document, null, 2));

  const redocOptions: RedocOptions = {
    title: 'ABU QUEUE API',
    sortPropsAlphabetically: true,
    hideDownloadButton: true,
    hideHostname: true,
    auth: {
      enabled: true,
      user: 'queue_doc',
      password: 'queue_doc2025',
    },
  };

  RedocModule.setup('api', app, document, redocOptions);
}
