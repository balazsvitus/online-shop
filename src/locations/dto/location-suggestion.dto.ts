export class LocationSuggestionDTO {
  id: number;
  city: string;
  county: string;
  country: string;

  constructor(id: number, city: string, county: string, country: string) {
    this.id = id;
    this.city = city;
    this.county = county;
    this.country = country;
  }
}
