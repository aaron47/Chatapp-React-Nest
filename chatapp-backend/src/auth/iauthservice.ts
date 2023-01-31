import { User } from './../typeorm/entities/User';
import { AuthDto } from 'src/dto/Auth.dto';

export interface IAuthService {
  validateUser(authDto: AuthDto): Promise<User | null>;
}
