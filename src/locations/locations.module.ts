import { Module } from '@nestjs/common';
import { LocationsController } from './controller/locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Location from './domain/location.domain';
import { LocationsService } from './service/locations.service';
import LocationsRepository from './repository/location.repository';
import LocationsMapper from './mapper/location.mapper';
import { CsvService } from './service/csv.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationsController],
  providers: [
    LocationsService,
    LocationsRepository,
    LocationsMapper,
    CsvService,
  ],
})
export class LocationsModule {}
