import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from 'src/dto/Auth.dto';
import { User } from 'src/typeorm/entities';
import { Services } from 'src/utils/Services';
import { IAuthService } from './iauthservice';
import * as argon2 from 'argon2';
import { IUserService } from 'src/user/iuserservice';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER_SERVICE) private readonly userService: IUserService,
  ) {}

  async validateUser(authDto: AuthDto): Promise<User | null> {
    const user = await this.userService.findOneByEmail(authDto.email);

    if (!user) throw new UnauthorizedException('User was not found');

    const isPasswordValid = await argon2.verify(
      user.password,
      authDto.password,
    );

    return isPasswordValid ? user : null;
  }

  async signUp(authDto: AuthDto) {
    return this.userService.createUser(authDto);
  }
}
