import { User } from './../typeorm/entities';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from 'src/dto/Auth.dto';
import { IUserService } from './iuserservice';
import * as argon2 from 'argon2';
import { SetAvatarDto } from 'src/dto/SetAvatarDto.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(authDto: AuthDto): Promise<User> {
    const dbUser = await this.findOneByEmail(authDto.email);

    if (dbUser) throw new ForbiddenException('User already exists');

    const hashedPassword = await argon2.hash(authDto.password);

    const newUser = this.userRepository.create({
      ...authDto,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user || null;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    return user || null;
  }

  async findAllUsers(user: User): Promise<User[]> {
    if (!user) throw new ForbiddenException('You are not logged in.');

    const users = this.userRepository.query(
      `SELECT email, id, avatarUrl, isAvatarSet FROM users WHERE id NOT LIKE ${user.id}`,
    );

    return users;
  }

  setUserAvatar(id: number, { avatarUrl }: SetAvatarDto): Promise<User> {
    return this.userRepository.save({ id, avatarUrl, isAvatarSet: true });
  }
}
