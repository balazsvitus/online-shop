import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(private readonly dataSource: DataSource) {}

  async seed(
    customerId: string,
    firstProductId: string,
    secondProductId: string,
    locationId: string,
  ): Promise<void> {
    await this.dataSource.query(
      `INSERT INTO "customer"("id","password","username","firstName","lastName","emailAddress","role") VALUES('${customerId}','$2a$10$C0bmGFnoV/40eNXbR2g5ne5/Mq1rB8Ec6nrCbNPaOZC.SL3SUvdSy','vitusbalazs','Balazs','Vitus','vitusbalazs01@yahoo.com','admin');`,
    );
    const productCategory = await this.dataSource.query(
      `INSERT INTO "product_category"("name","description") VALUES('Beverages','Water, sodas, fun drinks') RETURNING "id";`,
    );
    await this.dataSource.query(
      `INSERT INTO "product"("id","name","description","price","weight","supplier","imageUrl","category_id") VALUES('${firstProductId}','Coca-Cola','The funnest drink',6,1,'The Coca-Cola Company','https://cdn.contentspeed.ro/magazinitalian.websales.ro/cs-content/cs-photos/products/original/suc-coca-cola-33-cl_5808_2_17042917003029.jpg','${productCategory[0].id}');`,
    );
    await this.dataSource.query(
      `INSERT INTO "product"("id","name","description","price","weight","supplier","imageUrl","category_id") VALUES('${secondProductId}','Fanta','Orange drink',5,2,'The Coca-Cola Company','https://www.coca-cola.com/content/dam/onexp/ro/ro/home-images/brands1/fanta/update-fanta-apr-2024/fanta-orange.jpg','${productCategory[0].id}');`,
    );
    await this.dataSource.query(
      `INSERT INTO "location"("id","name","country","city","county","streetAddress") VALUES('${locationId}','Vivo Cluj-Napoca','Romania','Floresti','Cluj','Strada Avram Iancu 492-500');`,
    );
    await this.dataSource.query(
      `INSERT INTO "stock"("productId","locationId","quantity") VALUES ('${firstProductId}','${locationId}',10), ('${secondProductId}','${locationId}',8);`,
    );
  }

  async clear(): Promise<void> {
    await this.dataSource.query(
      'TRUNCATE TABLE order_detail, stock, "order", customer, location, product, product_category RESTART IDENTITY CASCADE',
    );
  }
}
