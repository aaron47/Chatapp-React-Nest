import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { entities } from './typeorm/entities';
import { UserModule } from './user/user.module';
import * as Joi from 'joi';
import { PassportModule } from '@nestjs/passport';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'testuser',
      password: 'testuser123',
      database: 'chatapp',
      entities,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SESSION_SECRET: Joi.string().required(),
      }),
    }),
    PassportModule.register({
      session: true,
    }),
    AuthModule,
    UserModule,
    MessageModule,
  ],
})
export class AppModule {}
