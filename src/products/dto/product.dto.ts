export default class ProductDTO {
  name: string;
  description: string;
  price: number;
  weight: number;
  category: string;
  supplier: string;
  imageUrl: string;

  constructor(
    name: string,
    description: string,
    price: number,
    weight: number,
    category: string,
    supplier: string,
    imageUrl: string,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.category = category;
    this.supplier = supplier;
    this.imageUrl = imageUrl;
  }
}
