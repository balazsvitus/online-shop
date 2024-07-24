import { Injectable } from '@nestjs/common';
import ProductDTO from '../dto/product.dto';
import Product from '../domain/product.domain';
import ProductCategory from '../domain/productCategory.domain';
import ProductOutDTO from '../dto/productOut.dto';
import ProductCategoryOutDTO from '../dto/productCategoryOut.dto';

@Injectable()
export default class ProductsMapper {
  productToDto(product: Product): ProductDTO {
    return new ProductDTO(
      product.id,
      product.name,
      product.description,
      product.price,
      product.weight,
      product.category.id,
      product.supplier,
      product.imageUrl,
    );
  }

  dtoToProduct(productDTO: ProductDTO, category: ProductCategory): Product {
    return new Product(
      productDTO.name,
      productDTO.description,
      productDTO.price,
      productDTO.weight,
      category,
      productDTO.supplier,
      productDTO.imageUrl,
    );
  }

  productToProductOutDto(
    product: Product,
    productCategoryDTO: ProductCategoryOutDTO,
  ): ProductOutDTO {
    return new ProductOutDTO(
      product.id,
      product.name,
      product.description,
      product.price,
      product.weight,
      productCategoryDTO,
      product.supplier,
      product.imageUrl,
    );
  }
}
