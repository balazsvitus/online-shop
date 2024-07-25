import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import ProductsRepository from '../repository/products.repository';
import Product from '../domain/product.domain';
import ProductCategory from '../domain/productCategory.domain';

describe('productsService', () => {
  let productsService: ProductsService;
  let productsRepository: jest.Mocked<ProductsRepository>;

  beforeEach(async () => {
    productsRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<ProductsRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: productsRepository },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  it('should create a product', async () => {
    const product = {
      id: 'b5d36b68-3304-48ec-a228-db7c2bd50501',
      name: 'Coca-Cola',
      description: 'Orange go brr',
      price: 5,
      weight: 10,
      category: {
        id: '73ec7a0d-a499-4304-9629-670e5eebdc9d',
        name: 'Beverages',
        description: 'cooolaaa',
      } as ProductCategory,
      supplier: 'The Coca Cola Company',
      imageUrl:
        'https://auchan.vtexassets.com/arquivos/ids/209270/bautura-racoritoare-carbogazoasa-schweppes-bitter-lemon-033-l-doza-9432250318878.jpg?v=638011830928570000',
    } as Product;
    productsRepository.save.mockResolvedValue(product);

    const result = await productsService.createProduct(product);

    expect(result).toEqual(product);
    expect(productsRepository.save).toHaveBeenCalledWith(product);
  });

  it('should find a product by id', async () => {
    const product = {
      id: 'b5d36b68-3304-48ec-a228-db7c2bd50501',
      name: 'Coca-Cola',
      description: 'Orange go brr',
      price: 5,
      weight: 10,
      category: {
        id: '73ec7a0d-a499-4304-9629-670e5eebdc9d',
        name: 'Beverages',
        description: 'cooolaaa',
      } as ProductCategory,
      supplier: 'The Coca Cola Company',
      imageUrl:
        'https://auchan.vtexassets.com/arquivos/ids/209270/bautura-racoritoare-carbogazoasa-schweppes-bitter-lemon-033-l-doza-9432250318878.jpg?v=638011830928570000',
    } as Product;
    productsRepository.findOne.mockResolvedValue(product);

    const result = await productsService.getProductById(
      'b5d36b68-3304-48ec-a228-db7c2bd50501',
    );

    expect(result).toEqual(product);
    expect(productsRepository.findOne).toHaveBeenCalledWith(
      'b5d36b68-3304-48ec-a228-db7c2bd50501',
    );
  });

  it('should find all product categories', async () => {
    const products = [
      {
        id: 'b5d36b68-3304-48ec-a228-db7c2bd50501',
        name: 'Coca-Cola',
        description: 'Sugar go brr',
        price: 5,
        weight: 10,
        category: {
          id: '73ec7a0d-a499-4304-9629-670e5eebdc9d',
          name: 'Beverages',
          description: 'cooolaaa',
        } as ProductCategory,
        supplier: 'The Coca Cola Company',
        imageUrl:
          'https://auchan.vtexassets.com/arquivos/ids/209270/bautura-racoritoare-carbogazoasa-schweppes-bitter-lemon-033-l-doza-9432250318878.jpg?v=638011830928570000',
      },
      {
        id: '1bfa81f5-4758-44f7-8f86-3f5026e667ef',
        name: 'Schweppes',
        description: "I don't like tonic",
        price: 5,
        weight: 10,
        category: {
          id: '73ec7a0d-a499-4304-9629-670e5eebdc9d',
          name: 'Beverages',
          description: 'cooolaaa',
        } as ProductCategory,
        supplier: 'The Coca Cola Company',
        imageUrl:
          'https://auchan.vtexassets.com/arquivos/ids/209270/bautura-racoritoare-carbogazoasa-schweppes-bitter-lemon-033-l-doza-9432250318878.jpg?v=638011830928570000',
      },
    ] as Product[];
    productsRepository.findAll.mockResolvedValue(products);

    const result = await productsService.getProducts();

    expect(result).toEqual(products);
    expect(productsRepository.findAll).toHaveBeenCalled();
  });

  it('should update a product category', async () => {
    const product = {
      id: 'b5d36b68-3304-48ec-a228-db7c2bd50501',
      name: 'Coca-Cola',
      description: 'Sugar go brr',
      price: 5,
      weight: 10,
      category: {
        id: '73ec7a0d-a499-4304-9629-670e5eebdc9d',
        name: 'Beverages',
        description: 'cooolaaa',
      } as ProductCategory,
      supplier: 'The Coca Cola Company',
      imageUrl:
        'https://auchan.vtexassets.com/arquivos/ids/209270/bautura-racoritoare-carbogazoasa-schweppes-bitter-lemon-033-l-doza-9432250318878.jpg?v=638011830928570000',
    } as Product;
    productsRepository.findOne.mockResolvedValue(product);
    productsRepository.save.mockResolvedValue(product);

    const result = await productsService.updateProduct(product);

    expect(result).toEqual(product);
    expect(productsRepository.save).toHaveBeenCalledWith(product);
  });

  it('should delete a product category', async () => {
    const product = {
      id: 'b5d36b68-3304-48ec-a228-db7c2bd50501',
      name: 'Coca-Cola',
      description: 'Sugar go brr',
      price: 5,
      weight: 10,
      category: {
        id: '73ec7a0d-a499-4304-9629-670e5eebdc9d',
        name: 'Beverages',
        description: 'cooolaaa',
      } as ProductCategory,
      supplier: 'The Coca Cola Company',
      imageUrl:
        'https://auchan.vtexassets.com/arquivos/ids/209270/bautura-racoritoare-carbogazoasa-schweppes-bitter-lemon-033-l-doza-9432250318878.jpg?v=638011830928570000',
    } as Product;
    productsRepository.findOne.mockResolvedValue(product);
    productsRepository.remove.mockResolvedValue();

    await expect(
      productsService.removeProduct(product.id),
    ).resolves.not.toThrow();
    expect(productsRepository.remove).toHaveBeenCalledWith(product.id);
  });
});
