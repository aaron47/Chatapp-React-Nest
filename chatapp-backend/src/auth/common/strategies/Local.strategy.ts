import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAuthService } from 'src/auth/iauthservice';
import { Services } from 'src/utils/Services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @Inject(Services.AUTH_SERVICE) private readonly authService: IAuthService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });
    if (!user) throw new ForbiddenException('Invalid credentials');
     
    return user || null;
  }
}
