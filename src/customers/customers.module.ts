import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Customer from './domain/Customer';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
})
export class CustomersModule {}
