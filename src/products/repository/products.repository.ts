import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Product from '../domain/product.domain';

@Injectable()
export default class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['category'] });
  }

  findOne(id: string): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }

  create(order: Product): Promise<Product> {
    return this.productsRepository.save(order);
  }

  update(order: Product): Promise<Product> {
    return this.productsRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
