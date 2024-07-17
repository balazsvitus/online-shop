import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './controller/customers.controller';
import { CustomersService } from './service/customers.service';
import Customer from './domain/Customer';
import CustomerRepository from './repository/CustomerRepository';
import CustomersMapper from './mapper/customers.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerRepository, CustomersService, CustomersMapper],
  controllers: [CustomersController],
})
export class CustomersModule {}
