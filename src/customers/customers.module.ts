import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './controller/customers.controller';
import { CustomersService } from './service/customers.service';
import Customer from './domain/customer.domain';
import CustomersRepository from './repository/customers.repository';
import CustomersMapper from './mapper/customers.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersRepository, CustomersService, CustomersMapper],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
