import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';

@Injectable()
export class CustomJwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest<T>(err: Error, user: T): T {
    if (err) {
      throw err;
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
