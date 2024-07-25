import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CustomersService } from '../../customers/service/customers.service';
import { User } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<{
    username: string;
    id: string;
    role: string;
  } | null> {
    const user = await this.customersService.getCustomersByUsername(username);
    if (!user) {
      throw new UnauthorizedException('The username is incorrect');
    }
    if (user && (await compare(password, user.password))) {
      return { username: user.username, id: user.id, role: user.role };
    }
    return null;
  }

  async login(customer: User): Promise<{
    id: string;
    username: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }> {
    if (!customer.username || !customer.password) {
      throw new UnauthorizedException(
        'You must provide a username and a password!',
      );
    }
    const valid = await this.validateUser(customer.username, customer.password);
    if (!valid) {
      throw new UnauthorizedException('The password is incorrect');
    }
    const payload = {
      username: valid.username,
      sub: valid.id,
      role: valid.role,
    };

    return {
      id: valid.id,
      username: valid.username,
      role: valid.role,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refresh({
    refresh,
  }: {
    refresh: string;
  }): Promise<{ accessToken: string }> {
    if (!refresh) {
      throw new UnauthorizedException('You must provide a refresh token!');
    }
    const id = this.jwtService.decode(refresh).sub;
    const customer = await this.customersService.getCustomerById(id);
    if (!customer) {
      throw new UnauthorizedException('The user cannot be found');
    }
    const payload = {
      username: customer.username,
      sub: customer.id,
      role: customer.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
