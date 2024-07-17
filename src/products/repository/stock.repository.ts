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

  update(stock: Stock): Promise<Stock> {
    return this.stocksRepository.save(stock);
  }
}
