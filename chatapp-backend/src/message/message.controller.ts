import { Services } from 'src/utils/Services';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMessageDto } from 'src/dto/CreateMessage.dto';
import { User } from 'src/typeorm/entities';
import { GetCurrentUser } from 'src/utils/decorators/GetCurrentUser.decorator';
import { IMessageService } from './imessageservice';

@Controller('message')
export class MessageController {
  constructor(
    @Inject(Services.MESSAGE_SERVICE)
    private readonly messageService: IMessageService,
  ) {}

  @Post(':id/create')
  async createMessage(
    @GetCurrentUser() user: User,
    @Param('id', ParseIntPipe) recipientId: number,
    @Body() message: CreateMessageDto,
  ) {
    return this.messageService.createMessage(user, message, recipientId);
  }

  @Get(':id/all')
  async getAllMessages(
    @GetCurrentUser() user: User,
    @Param('id', ParseIntPipe) recipientId: number,
  ) {
    return this.messageService.getAllMessages(user, recipientId);
  }
}
