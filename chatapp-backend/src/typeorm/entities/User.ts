import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './Message';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: '' })
  avatarUrl: string;

  @Column({ default: false })
  isAvatarSet: boolean;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];
}
