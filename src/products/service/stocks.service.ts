import { Injectable } from '@nestjs/common';
import StocksRepository from '../repository/stock.repository';
import Stock from '../domain/stock.domain';

@Injectable()
export class StocksService {
  constructor(private stocksRepository: StocksRepository) {}

  async getStocks(): Promise<Stock[]> {
    return this.stocksRepository.findAll();
  }

  async updateProduct(stock: Stock): Promise<Stock> {
    return this.stocksRepository.update(stock);
  }
}
