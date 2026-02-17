import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class CustomJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null =>
          (req?.cookies?.access_token as string) ?? null,
      ]),
      secretOrKey: process.env.JWT_SECRET || 'jwt-secret-key',
    });
  }

  public async validate(payload: {
    id: string;
    email: string;
    firstName: string;
  }) {
    const user = await this.authService.validateUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
