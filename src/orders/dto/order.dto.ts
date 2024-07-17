export default class OrderDTO {
  customer: string;
  createdAt: string;
  country: string;
  city: string;
  county: string;
  streetAddress: string;

  constructor(
    customer: string,
    createdAt: string,
    country: string,
    city: string,
    county: string,
    streetAddress: string,
  ) {
    this.customer = customer;
    this.createdAt = createdAt;
    this.country = country;
    this.city = city;
    this.county = county;
    this.streetAddress = streetAddress;
  }
}
