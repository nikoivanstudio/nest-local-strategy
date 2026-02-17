// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Request } from 'express';
// import { Observable } from 'rxjs';
//
// type IsActivated = boolean | Promise<boolean> | Observable<boolean>;
//
// @Injectable()
// export class AccessGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}
//   public canActivate(context: ExecutionContext): IsActivated {
//     const role: string | null = this.reflector.get(
//       'role',
//       context.getHandler(),
//     );
//     const request: Request = context.switchToHttp().getRequest();
//     const authorization = request.headers.authorization;
//     const token = authorization?.replace(/Bearer /, '');
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//
//     if (role && !payload.roles.includes(role)) {
//       throw new UnauthorizedException();
//     }
//
//     request.user = payload.user;
//
//     return true;
//   }
// }
