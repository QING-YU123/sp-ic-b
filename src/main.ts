import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { ActivityService } from './activity/activity.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.enableCors();
  await app.listen(12005);

  ActivityService.intervalTask();
}
bootstrap();
