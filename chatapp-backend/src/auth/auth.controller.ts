import {
  AuthenticatedGuard,
  LocalAuthGuard,
} from './common/guards/Guards.guard';
import { AuthDto } from './../dto/Auth.dto';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Services } from 'src/utils/Services';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.AUTH_SERVICE) private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() authDto: AuthDto) {
    return instanceToPlain(await this.authService.signUp(authDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return instanceToPlain(req.user);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async status(@Req() req: Request) {
    return instanceToPlain(req.user);
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (!err) {
        res.clearCookie('NESTJS_SESSION_ID', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });
        res.send(200);
      } else {
        res.send(400);
      }
    });
  }
}
