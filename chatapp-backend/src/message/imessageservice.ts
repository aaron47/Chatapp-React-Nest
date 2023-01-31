import { CreateMessageDto } from 'src/dto/CreateMessage.dto';
import { Message, User } from 'src/typeorm/entities';

export interface IMessageService {
  createMessage(
    user: User,
    message: CreateMessageDto,
    recipientId: number,
  ): Promise<Message>;
  getAllMessages(user: User, recipientId: number): Promise<Message[]>;
}
