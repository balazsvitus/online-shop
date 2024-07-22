import {
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RefreshJwtGuard } from '../guard/refresh-jwt-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { User } from '../domain/user.domain';
import { RefreshToken } from '../domain/refresh-token.domain';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: User })
  async login(@Request() req: { body: User }) {
    if (!req.body.username || !req.body.password) {
      throw new UnauthorizedException(
        'You must provide a username and a password!',
      );
    }
    return await this.authService.login(req.body);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  @ApiBody({ type: RefreshToken })
  async refresh(@Request() req: { body: RefreshToken }) {
    return this.authService.refresh(req.body);
  }
}
