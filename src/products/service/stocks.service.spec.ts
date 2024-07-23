import { Test, TestingModule } from '@nestjs/testing';
import StocksRepository from '../repository/stock.repository';
import { StocksService } from './stocks.service';
import Stock from '../domain/stock.domain';
import OrderDetail from '../../orders/domain/orderDetail.domain';

describe('stocksService', () => {
  let stocksService: StocksService;
  let stocksRepository: jest.Mocked<StocksRepository>;

  beforeEach(async () => {
    stocksRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<StocksRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StocksService,
        {
          provide: StocksRepository,
          useValue: stocksRepository,
        },
      ],
    }).compile();

    stocksService = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(stocksService).toBeDefined();
  });

  it('should find a stock by id', async () => {
    const stock = {
      productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
      locationId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
      quantity: 56,
    } as Stock;
    stocksRepository.findOne.mockResolvedValue(stock);

    const result = await stocksService.getStock(
      '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
      'd18e3b29-e02e-4c68-a017-d1f030659109',
    );

    expect(result).toEqual(stock);
    expect(stocksRepository.findOne).toHaveBeenCalledWith(
      '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
      'd18e3b29-e02e-4c68-a017-d1f030659109',
    );
  });

  it('should update a stock', async () => {
    const stock = {
      productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
      locationId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
      quantity: 56,
    } as Stock;
    stocksRepository.findOne.mockResolvedValue({ ...stock, quantity: 10 });
    stocksRepository.update.mockResolvedValue(stock);

    const result = await stocksService.updateStock(stock);

    expect(result).toEqual(stock);
    expect(stocksRepository.update).toHaveBeenCalledWith(stock);
  });

  it('should decrease stock', async () => {
    const stock = {
      productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
      locationId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
      quantity: 10,
    } as Stock;
    const orderDetail = {
      orderId: '1bfa81f5-4758-44f7-8f86-3f5026e667ef',
      productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
      shippedFromId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
      quantity: 5,
    } as OrderDetail;
    stocksRepository.findOne.mockResolvedValue(stock);
    stocksRepository.update.mockResolvedValue({
      ...stock,
      quantity: stock.quantity - orderDetail.quantity,
    });

    await expect(
      stocksService.decreaseStock([orderDetail]),
    ).resolves.not.toThrow();
    expect(stocksRepository.update).toHaveBeenCalledWith(stock);
  });

  it('should throw error while decreasing stock', async () => {
    const stock = {
      productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
      locationId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
      quantity: 3,
    } as Stock;
    const orderDetail = {
      orderId: '1bfa81f5-4758-44f7-8f86-3f5026e667ef',
      productId: '3aa5dcd2-ceba-4615-9dbf-d0d84b3c38a2',
      shippedFromId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
      quantity: 5,
    } as OrderDetail;
    stocksRepository.findOne.mockResolvedValue(stock);
    stocksRepository.update.mockResolvedValue({
      ...stock,
      quantity: stock.quantity - orderDetail.quantity,
    });

    await expect(stocksService.decreaseStock([orderDetail])).rejects.toThrow();
    expect(stocksRepository.update).toHaveBeenCalledTimes(0);
  });
});
