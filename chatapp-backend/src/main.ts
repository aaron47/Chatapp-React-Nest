import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Session } from './typeorm/entities';
import { TypeormStore } from 'connect-typeorm/out';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const PORT = 5000;
  const logger = new Logger();
  const configService = app.get<ConfigService>(ConfigService);
  const sessionStore = app.get(DataSource).getRepository(Session);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 24 * 7,
      },
      store: new TypeormStore().connect(sessionStore),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT);
  logger.log(`Listening on http://localhost:${PORT}/api`);
}
bootstrap();
