import { Injectable, NotFoundException } from '@nestjs/common';
import Location from '../domain/location.domain';
import LocationsRepository from '../repository/location.repository';

@Injectable()
export class LocationsService {
  constructor(private locationsRepository: LocationsRepository) {}

  getLocations(): Promise<Location[]> {
    return this.locationsRepository.findAll();
  }

  async getLocationById(id: string): Promise<Location | null> {
    const location = await this.locationsRepository.findOne(id);
    if (!location) {
      throw new NotFoundException("The location can't be found");
    }
    return location;
  }

  createLocation(location: Location): Promise<Location> {
    return this.locationsRepository.save(location);
  }

  async updateLocation(location: Location): Promise<Location> {
    await this.getLocationById(location.id);
    return this.locationsRepository.save(location);
  }

  async removeLocation(id: string): Promise<void> {
    await this.getLocationById(id);
    this.locationsRepository.remove(id);
  }
}
