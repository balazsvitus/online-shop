import { Injectable, NotFoundException } from '@nestjs/common';
import ProductCategory from '../domain/productCategory.domain';
import ProductCategoriesRepository from '../repository/productCategories.repository';

@Injectable()
export class ProductCategoriesService {
  constructor(
    private productCategoriesRepository: ProductCategoriesRepository,
  ) {}

  async getProductCategories(): Promise<ProductCategory[]> {
    return this.productCategoriesRepository.findAll();
  }

  async getProductCategoryById(id: string): Promise<ProductCategory | null> {
    const product = await this.productCategoriesRepository.findOne(id);
    if (product === null) {
      throw new NotFoundException();
    }
    return product;
  }

  async createProductCategory(
    productCategory: ProductCategory,
  ): Promise<ProductCategory> {
    return this.productCategoriesRepository.create(productCategory);
  }

  async updateProductCategory(
    productCategory: ProductCategory,
  ): Promise<ProductCategory> {
    return this.productCategoriesRepository.update(productCategory);
  }

  async removeProductCategory(id: string): Promise<void> {
    this.productCategoriesRepository.remove(id);
  }
}
