import { Injectable, NotFoundException } from '@nestjs/common';
import StocksRepository from '../repository/stock.repository';
import Stock from '../domain/stock.domain';

@Injectable()
export class StocksService {
  constructor(private stocksRepository: StocksRepository) {}

  getStocks(): Promise<Stock[]> {
    return this.stocksRepository.findAll();
  }

  async getStock(productId: string, locationId: string): Promise<Stock> {
    const stock = await this.stocksRepository.findOne(productId, locationId);
    if (!stock) {
      throw new NotFoundException(
        "The product can't be found in this location",
      );
    }
    return stock;
  }

  async updateProduct(stock: Stock): Promise<Stock> {
    await this.getStock(stock.productId, stock.locationId);
    return this.stocksRepository.update(stock);
  }
}
