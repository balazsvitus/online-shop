import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RefreshJwtGuard } from '../guard/refresh-jwt-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { User } from '../dto/user.dto';
import { RefreshToken } from '../dto/refresh-token.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { LocalAuthService } from '../service/auth-local.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private localAuthService: LocalAuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: User })
  async login(@Request() req: { body: User }): Promise<{
    id: string;
    username: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }> {
    return await this.authService.login(req.body);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  @ApiBody({ type: RefreshToken })
  async refresh(
    @Request() req: { body: RefreshToken },
  ): Promise<{ accessToken: string }> {
    return this.authService.refresh(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login-local')
  async loginLocal(@Request() req: { body: User }): Promise<{
    id: string;
    username: string;
    role: string;
    accessToken: string;
  }> {
    return await this.localAuthService.loginLocal(req.body);
  }
}
