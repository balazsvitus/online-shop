import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Location from '../domain/location.domain';

@Injectable()
export default class LocationsRepository {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  findAll(): Promise<Location[]> {
    return this.locationsRepository.find();
  }

  findOne(id: string): Promise<Location | null> {
    return this.locationsRepository.findOneBy({ id });
  }

  create(location: Location): Promise<Location> {
    return this.locationsRepository.save(location);
  }

  update(location: Location): Promise<Location> {
    return this.locationsRepository.save(location);
  }

  async remove(id: string): Promise<void> {
    await this.locationsRepository.delete(id);
  }
}
