import { Injectable } from '@nestjs/common';
import ProductDTO from '../dto/product.dto';
import Product from '../domain/product.domain';
import ProductCategory from '../domain/productCategory.domain';

@Injectable()
export default class ProductsMapper {
  productToDto(product: Product): ProductDTO {
    return new ProductDTO(
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
}
