import { Injectable, NotFoundException } from '@nestjs/common';
import Location from '../domain/location.domain';
import LocationsRepository from '../repository/location.repository';

@Injectable()
export class LocationsService {
  constructor(private locationsRepository: LocationsRepository) {}

  async getLocations(): Promise<Location[]> {
    return this.locationsRepository.findAll();
  }

  async getLocationById(id: string): Promise<Location | null> {
    const location = await this.locationsRepository.findOne(id);
    if (location === null) {
      throw new NotFoundException();
    }
    return location;
  }

  async createLocation(location: Location): Promise<Location> {
    return this.locationsRepository.create(location);
  }

  async updateLocation(location: Location): Promise<Location> {
    return this.locationsRepository.update(location);
  }

  async removeLocation(id: string): Promise<void> {
    this.locationsRepository.remove(id);
  }
}
