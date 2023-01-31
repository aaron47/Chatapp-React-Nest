import { SessionSerializer } from './common/Serializer';
import { LocalStrategy } from './common/strategies/Local.strategy';
import { Services } from './../utils/Services';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    SessionSerializer,
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
