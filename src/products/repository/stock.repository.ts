import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stock from '../domain/stock.domain';

@Injectable()
export default class StocksRepository {
  constructor(
    @InjectRepository(Stock)
    private stocksRepository: Repository<Stock>,
  ) {}

  findAll(): Promise<Stock[]> {
    return this.stocksRepository.find();
  }

  findOne(productId: string, locationId: string): Promise<Stock> {
    return this.stocksRepository.findOne({
      where: {
        productId,
        locationId,
      },
    });
  }

  update(stock: Stock): Promise<Stock> {
    return this.stocksRepository.save(stock);
  }
}
