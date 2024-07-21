import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import Customer from '../../customers/domain/customer.domain';
import { RefreshJwtGuard } from '../guard/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req: { body: Customer }) {
    return await this.authService.login(req.body);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.refresh(req.body);
  }
}
