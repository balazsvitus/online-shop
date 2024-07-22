import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProductCategory from '../domain/productCategory.domain';

@Injectable()
export default class ProductCategoriesRepository {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
  ) {}

  findAll(): Promise<ProductCategory[]> {
    return this.productCategoriesRepository.find();
  }

  findOne(id: string): Promise<ProductCategory | null> {
    return this.productCategoriesRepository.findOneBy({ id });
  }

  save(order: ProductCategory): Promise<ProductCategory> {
    return this.productCategoriesRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    await this.productCategoriesRepository.delete(id);
  }
}
