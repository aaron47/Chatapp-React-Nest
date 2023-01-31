import { AuthenticatedGuard } from './../auth/common/guards/Guards.guard';
import { IUserService } from 'src/user/iuserservice';
import { Services } from './../utils/Services';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/utils/decorators/GetCurrentUser.decorator';
import { User } from 'src/typeorm/entities';
import { SetAvatarDto } from 'src/dto/SetAvatarDto.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(Services.USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Get('all')
  async getAllUsers(@GetCurrentUser() user: User) {
    return this.userService.findAllUsers(user);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id/setavatar')
  async setAvatar(
    @Param('id', ParseIntPipe) id: number,
    @Body() setAvatarDto: SetAvatarDto,
  ) {
    return this.userService.setUserAvatar(id, setAvatarDto);
  }
}
