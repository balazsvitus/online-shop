import { Injectable, NotFoundException } from '@nestjs/common';
import ProductsRepository from '../repository/products.repository';
import Product from '../domain/product.domain';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await this.productsRepository.findOne(id);
    if (product === null) {
      throw new NotFoundException();
    }
    return product;
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productsRepository.create(product);
  }

  async updateProduct(product: Product): Promise<Product> {
    return this.productsRepository.update(product);
  }

  async removeProduct(id: string): Promise<void> {
    this.productsRepository.remove(id);
  }
}
