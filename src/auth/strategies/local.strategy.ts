import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

type ValidateReturnType = {
  id: string;
  username: string;
  role: string;
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<ValidateReturnType> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('The password is incorrect');
    }
    return user;
  }
}
