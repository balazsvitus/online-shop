import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { CustomersModule } from '../customers/customers.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';
import { RolesGuard } from './guard/roles.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthService } from './service/auth-local.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthService,
    JwtStrategy,
    RefreshJwtStrategy,
    RolesGuard,
    LocalStrategy,
  ],
  imports: [
    CustomersModule,
    JwtModule.register({
      global: true,
      secret: '$2a$12$woZJtsABa4SaU4KgOKCfaO5NHM6/jugg.A.HaJnCGCbn5i3ZrHECG',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
})
export class AuthModule {}
