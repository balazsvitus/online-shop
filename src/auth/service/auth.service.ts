import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CustomersService } from '../../customers/service/customers.service';
import { User } from '../domain/user.domain';

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.customersService.getCustomersByUsername(username);
    if (!user) {
      throw new UnauthorizedException('The username is incorrect');
    }
    if (user && (await compare(password, user.password))) {
      return { username: user.username, id: user.id };
    }
    return null;
  }

  async login(customer: User) {
    const valid = await this.validateUser(customer.username, customer.password);
    if (!valid) {
      throw new UnauthorizedException('The password is incorrect');
    }
    const payload = {
      username: valid.username,
      sub: valid.id,
    };

    console.log(`[LOGIN] The user is ${valid.username}`);

    return {
      id: valid.id,
      username: valid.username,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refresh({ refresh }: { refresh: string }) {
    const id = this.jwtService.decode(refresh).sub;
    const customer = await this.customersService.getCustomerById(id);
    if (!customer) {
      throw new UnauthorizedException('The user cannot be found');
    }
    const payload = {
      username: customer.username,
      sub: customer.id,
    };

    console.log(`[REFRESH] The user is ${customer.username}`);

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async loginLocal(customer: User) {
    const valid = await this.validateUser(customer.username, customer.password);
    if (!valid) {
      throw new UnauthorizedException('The password is incorrect');
    }
    const payload = {
      username: valid.username,
      sub: valid.id,
    };

    console.log(payload);

    return {
      ...customer,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
