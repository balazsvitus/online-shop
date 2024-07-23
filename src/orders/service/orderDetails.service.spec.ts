import { Test, TestingModule } from '@nestjs/testing';
import OrderDetailsRepository from '../repository/orderDetails.repository';
import { OrderDetailsService } from './orderDetails.service';
import { StocksService } from '../../products/service/stocks.service';
import OrderDetail from '../domain/orderDetail.domain';
import Stock from '../../products/domain/stock.domain';

describe('orderDetailsService', () => {
  let orderDetailsService: OrderDetailsService;
  let orderDetailsRepository: jest.Mocked<OrderDetailsRepository>;
  let stocksService: jest.Mocked<StocksService>;

  beforeEach(async () => {
    orderDetailsRepository = {
      findAll: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<OrderDetailsRepository>;
    stocksService = {
      getStock: jest.fn(),
      updateStock: jest.fn(),
      decreaseStock: jest.fn(),
    } as unknown as jest.Mocked<StocksService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderDetailsService,
        {
          provide: OrderDetailsRepository,
          useValue: orderDetailsRepository,
        },
        {
          provide: StocksService,
          useValue: stocksService,
        },
      ],
    }).compile();

    orderDetailsService = module.get<OrderDetailsService>(OrderDetailsService);
  });

  it('should be defined', () => {
    expect(orderDetailsService).toBeDefined();
  });

  it('should validate order details', async () => {
    const orderDetails = [
      {
        orderId: '1bfa81f5-4758-44f7-8f86-3f5026e667ef',
        productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
        shippedFromId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
        quantity: 5,
      },
      {
        orderId: '25a82f62-f005-4c5d-b181-0f1cdb0669b7',
        productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
        shippedFromId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
        quantity: 5,
      },
    ] as OrderDetail[];
    stocksService.getStock.mockImplementation(
      async (productId: string, locationId: string) => {
        const quantity =
          orderDetails.find((orderDetail: OrderDetail) => {
            return (
              orderDetail.productId === productId &&
              orderDetail.shippedFromId === locationId
            );
          }).quantity || 100;
        return { quantity: quantity + 1 } as Stock;
      },
    );

    const result = await orderDetailsService.validateOrderDetails(orderDetails);

    expect(result).toBe(true);
    expect(stocksService.getStock).toHaveBeenCalledTimes(2);
  });

  it('should decrease stock', async () => {
    const orderDetails = [
      {
        orderId: '1bfa81f5-4758-44f7-8f86-3f5026e667ef',
        productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
        shippedFromId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
        quantity: 5,
      },
      {
        orderId: '25a82f62-f005-4c5d-b181-0f1cdb0669b7',
        productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
        shippedFromId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
        quantity: 5,
      },
    ] as OrderDetail[];
    stocksService.decreaseStock.mockResolvedValue();

    await expect(
      orderDetailsService.decreaseStock(orderDetails),
    ).resolves.not.toThrow();
    expect(stocksService.decreaseStock).toHaveBeenCalled();
  });

  it('should save order details', async () => {
    const orderDetails = [
      {
        orderId: '1bfa81f5-4758-44f7-8f86-3f5026e667ef',
        productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
        shippedFromId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
        quantity: 5,
      },
      {
        orderId: '25a82f62-f005-4c5d-b181-0f1cdb0669b7',
        productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
        shippedFromId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
        quantity: 5,
      },
    ] as OrderDetail[];
    orderDetailsRepository.save.mockImplementation(
      async (order: OrderDetail) => {
        return order;
      },
    );

    await expect(
      orderDetailsService.saveOrderDetails(orderDetails),
    ).resolves.not.toThrow();
    expect(orderDetailsRepository.save).toHaveBeenCalledTimes(2);
  });
});
