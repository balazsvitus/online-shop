import { Injectable, NotFoundException } from '@nestjs/common';
import ProductCategory from '../domain/productCategory.domain';
import ProductCategoriesRepository from '../repository/productCategories.repository';

@Injectable()
export class ProductCategoriesService {
  constructor(
    private productCategoriesRepository: ProductCategoriesRepository,
  ) {}

  getProductCategories(): Promise<ProductCategory[]> {
    return this.productCategoriesRepository.findAll();
  }

  async getProductCategoryById(id: string): Promise<ProductCategory | null> {
    const productCategory = await this.productCategoriesRepository.findOne(id);
    if (!productCategory) {
      throw new NotFoundException("The product category can't be found");
    }
    return productCategory;
  }

  createProductCategory(
    productCategory: ProductCategory,
  ): Promise<ProductCategory> {
    return this.productCategoriesRepository.save(productCategory);
  }

  async updateProductCategory(
    productCategory: ProductCategory,
  ): Promise<ProductCategory> {
    await this.getProductCategoryById(productCategory.id);
    return this.productCategoriesRepository.save(productCategory);
  }

  async removeProductCategory(id: string): Promise<void> {
    await this.getProductCategoryById(id);
    this.productCategoriesRepository.remove(id);
  }
}
