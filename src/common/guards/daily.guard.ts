import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class DailyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const date = new Date();

    return date.getHours() > 12;
  }
}
