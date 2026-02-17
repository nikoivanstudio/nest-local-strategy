import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUser } from '../user/domain';
import { CreateUserDto } from '../user/model/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser({
    username,
    password: pass,
  }: {
    username: string;
    password: string;
  }): Promise<Omit<IUser, 'password'> | null> {
    const user = await this.userService.getUserByEmail(username);

    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...rest } = user;

      return rest;
    }

    return null;
  }

  public async validateUserById(
    id: string,
  ): Promise<Omit<IUser, 'password'> | null> {
    return this.userService.getUserById(id);
  }

  public async createUser(
    user: CreateUserDto,
  ): Promise<Omit<IUser, 'password'> | null> {
    const registredUser = await this.userService.createUser(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = registredUser;

    return rest;
  }

  public async createToken(payload: {
    username: string;
    password: string;
  }): Promise<string> {
    const user = await this.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.jwtService.signAsync(user);
  }
}
