import { Injectable } from '@nestjs/common';
import ProductCategory from '../domain/productCategory.domain';
import ProductCategoryDTO from '../dto/productCatergory.dto';

@Injectable()
export default class ProductCategoriesMapper {
  productCategoryToDto(productCategory: ProductCategory): ProductCategoryDTO {
    return new ProductCategoryDTO(
      productCategory.name,
      productCategory.description,
    );
  }

  dtoToProductCategory(
    productCategoryDTO: ProductCategoryDTO,
  ): ProductCategory {
    return new ProductCategory(
      productCategoryDTO.name,
      productCategoryDTO.description,
    );
  }
}
