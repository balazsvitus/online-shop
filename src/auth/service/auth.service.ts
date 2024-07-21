import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import Customer from 'src/customers/domain/customer.domain';
import { CustomersService } from 'src/customers/service/customers.service';

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.customersService.getCustomersByUsername(username);
    if (user && (await compare(password, user.password))) {
      const result = { ...user };
      delete result.password;
      return result;
    }
    return null;
  }

  async login(customer: Customer) {
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
    const payload = {
      username: customer.username,
      sub: customer.id,
    };

    console.log(`[REFRESH] The user is ${customer.username}`);

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
