import { Injectable } from '@nestjs/common';
import Location from '../domain/location.domain';
import LocationDTO from '../dto/location.dto';

@Injectable()
export default class LocationsMapper {
  dtoToStock(locationDTO: LocationDTO): Location {
    return new Location(
      locationDTO.name,
      locationDTO.country,
      locationDTO.city,
      locationDTO.county,
      locationDTO.streetAddress,
    );
  }

  stockToDto(location: Location): LocationDTO {
    return new LocationDTO(
      location.name,
      location.country,
      location.city,
      location.county,
      location.streetAddress,
    );
  }
}
