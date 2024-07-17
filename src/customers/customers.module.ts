import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './controller/customers.controller';
import { CustomersService } from './service/customers.service';
import Customer from './domain/customer.domain';
import CustomerRepository from './repository/customer.repository';
import CustomersMapper from './mapper/customers.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerRepository, CustomersService, CustomersMapper],
  controllers: [CustomersController],
})
export class CustomersModule {}
