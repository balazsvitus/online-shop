import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerRole } from 'src/customers/enum/customerRole.enum';

type ValidateReturnType = {
  id: string;
  username: string;
  role: CustomerRole;
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
