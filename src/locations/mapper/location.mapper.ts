import { Injectable } from '@nestjs/common';
import Location from '../domain/location.domain';
import LocationDTO from '../dto/location.dto';
import LocationOutDTO from '../dto/locationOut.dto';

@Injectable()
export default class LocationsMapper {
  dtoToLocation(locationDTO: LocationDTO): Location {
    return new Location(
      locationDTO.name,
      locationDTO.country,
      locationDTO.city,
      locationDTO.county,
      locationDTO.streetAddress,
    );
  }

  locationToDto(location: Location): LocationDTO {
    return new LocationDTO(
      location.name,
      location.country,
      location.city,
      location.county,
      location.streetAddress,
    );
  }

  locationToOutDto(location: Location): LocationOutDTO {
    return new LocationOutDTO(
      location.id,
      location.name,
      location.country,
      location.city,
      location.county,
      location.streetAddress,
    );
  }
}
