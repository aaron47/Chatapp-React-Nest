import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm/entities';
import { IUserService } from 'src/user/iuserservice';
import { Services } from 'src/utils/Services';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USER_SERVICE) private readonly userService: IUserService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: any) => void): void {
    return done(null, user);
  }

  async deserializeUser(
    payload: User,
    done: (err: Error, payload: User) => void,
  ): Promise<void> {
    const user = await this.userService.findOneByEmail(payload.email);

    return user ? done(null, user) : done(null, null);
  }
}
