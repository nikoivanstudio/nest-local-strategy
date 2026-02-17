import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import type { Response } from 'express';
import { CreateUserValidationPipe } from 'src/common/pipes/create-user-validation.pipe';
import { CreateUserDto } from '../user/model/dto/create-user.dto';

import { AuthService } from './auth.service';

import { SignInUserValidationPipe } from '../../common/pipes/sign-in-user.pipe';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(SignInUserValidationPipe)
  @Post('signin')
  public async signin(
    @Body() data: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const token = await this.authService.createToken(data);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 16,
    });

    return { message: 'Logged in success' };
  }

  @UsePipes(CreateUserValidationPipe)
  @Post('signup')
  public async signUp(@Body() user: CreateUserDto) {
    await this.authService.createUser(user);
  }
}
