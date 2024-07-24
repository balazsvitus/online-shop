import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    await this.dataSource.query(
      `INSERT INTO "customer"("id","password","username","firstName","lastName","emailAddress","role") VALUES('33c5965f-e370-43af-8d9a-c877463f31b1','$2a$10$C0bmGFnoV/40eNXbR2g5ne5/Mq1rB8Ec6nrCbNPaOZC.SL3SUvdSy','vitusbalazs','Balazs','Vitus','vitusbalazs01@yahoo.com','admin');`,
    );
    const productCategory = await this.dataSource.query(
      `INSERT INTO "product_category"("name","description") VALUES('Beverages','Water, sodas, fun drinks') RETURNING "id";`,
    );
    const firstProduct = await this.dataSource.query(
      `INSERT INTO "product"("id","name","description","price","weight","supplier","imageUrl","category_id") VALUES('cf3bb5dc-8439-45a5-8e35-823bdb19d1ee','Coca-Cola','The funnest drink',6,1,'The Coca-Cola Company','https://cdn.contentspeed.ro/magazinitalian.websales.ro/cs-content/cs-photos/products/original/suc-coca-cola-33-cl_5808_2_17042917003029.jpg','${productCategory[0].id}') RETURNING "id";`,
    );
    const secondProduct = await this.dataSource.query(
      `INSERT INTO "product"("id","name","description","price","weight","supplier","imageUrl","category_id") VALUES('a03f8d3c-c3ee-41a3-b381-63e9728826e2','Fanta','Orange drink',5,2,'The Coca-Cola Company','https://www.coca-cola.com/content/dam/onexp/ro/ro/home-images/brands1/fanta/update-fanta-apr-2024/fanta-orange.jpg','${productCategory[0].id}') RETURNING "id";`,
    );
    const location = await this.dataSource.query(
      `INSERT INTO "location"("id","name","country","city","county","streetAddress") VALUES('485229c8-732e-4b0b-bdea-19c249a70b70','Vivo Cluj-Napoca','Romania','Floresti','Cluj','Strada Avram Iancu 492-500') RETURNING "id";`,
    );
    await this.dataSource.query(
      `INSERT INTO "stock"("productId","locationId","quantity") VALUES ('${firstProduct[0].id}','${location[0].id}',10), ('${secondProduct[0].id}','${location[0].id}',8);`,
    );
  }

  async clear() {
    await this.dataSource.query(
      'TRUNCATE TABLE order_detail, stock, "order", customer, location, product, product_category RESTART IDENTITY CASCADE',
    );
  }
}
