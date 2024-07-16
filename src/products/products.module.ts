import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductCategory from './domain/ProductCategory';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
})
export class ProductsModule {}
