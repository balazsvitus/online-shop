import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/roles.decorator';
import { CustomersService } from '../../customers/service/customers.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    let jwt = context.switchToHttp().getRequest().headers.authorization;
    if (!jwt) {
      return false;
    }

    jwt = jwt.split(' ')[1];
    const data = this.jwtService.decode(jwt);
    if (!data) {
      return false;
    }

    const user = await this.customersService.getCustomerById(data.sub);
    if (!user) {
      return false;
    }

    console.log(roles);
    console.log(user.role);

    return roles.includes(user.role);
  }
}
