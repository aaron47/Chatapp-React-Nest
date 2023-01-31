import { instanceToPlain } from 'class-transformer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, User } from 'src/typeorm/entities';
import { Repository } from 'typeorm';
import { IMessageService } from './imessageservice';
import { CreateMessageDto } from 'src/dto/CreateMessage.dto';

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createMessage(
    user: User,
    message: CreateMessageDto,
    recipientId: number,
  ) {
    const recipient = await this.userRepository.findOneBy({ id: recipientId });

    if (!recipient) throw new BadRequestException('User Does Not Exist');

    const newMessage = this.messageRepository.create({
      content: message.content,
      author: instanceToPlain(user),
      recipient: instanceToPlain(recipient),
    });

    return this.messageRepository.save(newMessage);
  }

  async getAllMessages(user: User, recipientId: number) {
    return this.messageRepository
      .createQueryBuilder('m1')
      .select(['id', 'content', 'created_at', 'm1.authorId', 'm1.recipientId'])
      .where('m1.authorId = :authorId AND m1.recipientId = :recipientId', {
        authorId: user.id,
        recipientId,
      })
      .orWhere('m1.authorId = :recipientId AND m1.recipientId = :authorId', {
        authorId: user.id,
        recipientId,
      })
      .orderBy('m1.created_at', 'ASC')
      .getRawMany();
  }
}
