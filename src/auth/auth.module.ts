import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { CustomersModule } from 'src/customers/customers.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';
import { RolesGuard } from './guard/roles.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy, RolesGuard],
  imports: [
    CustomersModule,
    JwtModule.register({
      global: true,
      secret: '$2a$12$woZJtsABa4SaU4KgOKCfaO5NHM6/jugg.A.HaJnCGCbn5i3ZrHECG',
      signOptions: {
        expiresIn: '180s',
      },
    }),
  ],
})
export class AuthModule {}
