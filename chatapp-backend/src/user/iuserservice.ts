import { AuthDto } from 'src/dto/Auth.dto';
import { SetAvatarDto } from 'src/dto/SetAvatarDto.dto';
import { User } from 'src/typeorm/entities';

export interface IUserService {
  createUser(authDto: AuthDto): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  findOneById(id: number): Promise<User>;
  findAllUsers(user: User): Promise<User[]>;
  setUserAvatar(id: number, { avatarUrl }: SetAvatarDto): Promise<User>;
}
