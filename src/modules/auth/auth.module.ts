import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './contants/settings';
import { CustomJwtStrategy } from './strategies/custom-jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  providers: [AuthService, CustomJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
