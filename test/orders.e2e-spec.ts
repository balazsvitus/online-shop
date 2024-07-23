import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new product category', () => {
    return request(app.getHttpServer())
      .post('/product-categories')
      .auth(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZpdHVzYmFsYXpzIiwic3ViIjoiNDZkYTQxMjgtZDE4MC00MDIwLTg3NzQtMDQyNmY2OTlmNjIyIiwiaWF0IjoxNzIxNzQzNjk5LCJleHAiOjE3MjE3NDcyOTl9.4XdAWnqnq4Gh3I6L_pllvyVE8WfxBseZCupImOg_kJc',
        { type: 'bearer' },
      )
      .send({
        name: 'Beverages',
        description: 'Coca-Colaaaaaa',
      })
      .expect(201);
  });
});
