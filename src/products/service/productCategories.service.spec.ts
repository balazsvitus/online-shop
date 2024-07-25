import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoriesService } from './productCategories.service';
import ProductCategoriesRepository from '../repository/productCategories.repository';
import ProductCategory from '../domain/productCategory.domain';

describe('productsService', () => {
  let productsCategoriesService: ProductCategoriesService;
  let productsCategoriesRepository: jest.Mocked<ProductCategoriesRepository>;

  beforeEach(async () => {
    productsCategoriesRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<ProductCategoriesRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoriesService,
        {
          provide: ProductCategoriesRepository,
          useValue: productsCategoriesRepository,
        },
      ],
    }).compile();

    productsCategoriesService = module.get<ProductCategoriesService>(
      ProductCategoriesService,
    );
  });

  it('should be defined', () => {
    expect(productsCategoriesService).toBeDefined();
  });

  it('should create a product category', async () => {
    const productCategory = {
      id: 'b5d36b68-3304-48ec-a228-db7c2bd50501',
      name: 'Chips',
      description: 'chips yummy',
    } as ProductCategory;
    productsCategoriesRepository.save.mockResolvedValue(productCategory);

    const result =
      await productsCategoriesService.createProductCategory(productCategory);

    expect(result).toEqual(productCategory);
    expect(productsCategoriesRepository.save).toHaveBeenCalledWith(
      productCategory,
    );
  });

  it('should find a product category by id', async () => {
    const productCategory = {
      id: 'b5d36b68-3304-48ec-a228-db7c2bd50501',
      name: 'Chips',
      description: 'chips yummy',
    } as ProductCategory;
    productsCategoriesRepository.findOne.mockResolvedValue(productCategory);

    const result = await productsCategoriesService.getProductCategoryById(
      'b5d36b68-3304-48ec-a228-db7c2bd50501',
    );

    expect(result).toEqual(productCategory);
    expect(productsCategoriesRepository.findOne).toHaveBeenCalledWith(
      'b5d36b68-3304-48ec-a228-db7c2bd50501',
    );
  });

  it('should find all product categories', async () => {
    const productCategories = [
      {
        id: 'b5d36b68-3304-48ec-a228-db7c2bd50501',
        name: 'Chips',
        description: 'chips yummy',
      },
      {
        id: '73ec7a0d-a499-4304-9629-670e5eebdc9d',
        name: 'Beverages',
        description: 'cooolaaa',
      },
    ] as ProductCategory[];
    productsCategoriesRepository.findAll.mockResolvedValue(productCategories);

    const result = await productsCategoriesService.getProductCategories();

    expect(result).toEqual(productCategories);
    expect(productsCategoriesRepository.findAll).toHaveBeenCalled();
  });

  it('should update a product category', async () => {
    const productCategory = {
      id: 'b5d36b68-3304-48ec-a228-db7c2bd50501',
      name: 'Chips',
      description: 'chips yummy',
    } as ProductCategory;
    productsCategoriesRepository.findOne.mockResolvedValue(productCategory);
    productsCategoriesRepository.save.mockResolvedValue(productCategory);

    const result =
      await productsCategoriesService.updateProductCategory(productCategory);

    expect(result).toEqual(productCategory);
    expect(productsCategoriesRepository.save).toHaveBeenCalledWith(
      productCategory,
    );
  });

  it('should delete a product category', async () => {
    const productCategory = {
      id: 'b5d36b68-3304-48ec-a228-db7c2bd50501',
      name: 'Chips',
      description: 'chips yummy',
    } as ProductCategory;
    productsCategoriesRepository.findOne.mockResolvedValue(productCategory);
    productsCategoriesRepository.remove.mockResolvedValue();

    await expect(
      productsCategoriesService.removeProductCategory(productCategory.id),
    ).resolves.not.toThrow();
    expect(productsCategoriesRepository.remove).toHaveBeenCalledWith(
      productCategory.id,
    );
  });
});
