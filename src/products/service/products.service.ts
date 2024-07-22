import { Injectable, NotFoundException } from '@nestjs/common';
import ProductsRepository from '../repository/products.repository';
import Product from '../domain/product.domain';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await this.productsRepository.findOne(id);
    if (!product) {
      throw new NotFoundException("The product can't be found");
    }
    return product;
  }

  createProduct(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }

  async updateProduct(product: Product): Promise<Product> {
    await this.getProductById(product.id);
    return this.productsRepository.save(product);
  }

  async removeProduct(id: string): Promise<void> {
    await this.getProductById(id);
    this.productsRepository.remove(id);
  }
}
