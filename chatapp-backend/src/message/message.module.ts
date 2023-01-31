import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message, User } from 'src/typeorm/entities';
import { Services } from 'src/utils/Services';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User])],
  controllers: [MessageController],
  providers: [
    {
      provide: Services.MESSAGE_SERVICE,
      useClass: MessageService,
    },
  ],
})
export class MessageModule {}
