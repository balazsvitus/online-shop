import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { SeederService } from '../src/shared/service/seederService.service';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  const loginDto = {
    username: 'vitusbalazs',
    password: 'password',
  };
  const customerId = '33c5965f-e370-43af-8d9a-c877463f31b1';
  const firstProductId = 'cf3bb5dc-8439-45a5-8e35-823bdb19d1ee';
  const secondProductId = 'a03f8d3c-c3ee-41a3-b381-63e9728826e2';
  const locationId = '485229c8-732e-4b0b-bdea-19c249a70b70';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const seederService = app.get<SeederService>(SeederService);
    await seederService.clear();
    await seederService.seed(
      customerId,
      firstProductId,
      secondProductId,
      locationId,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new order', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(201);

    return request(app.getHttpServer())
      .post('/orders')
      .auth(loginResponse.body.accessToken, { type: 'bearer' })
      .send({
        customer: customerId,
        createdAt: '2024-07-30T14:48:00.000Z',
        country: 'Romania',
        city: 'Cluj-Napoca',
        county: 'Cluj',
        streetAddress: 'Str Brassai Samuel 9',
        orderDetails: [
          {
            productId: firstProductId,
            shippedFrom: locationId,
            quantity: 7,
          },
          {
            productId: secondProductId,
            shippedFrom: locationId,
            quantity: 3,
          },
        ],
      })
      .expect(201);
  });

  it('should not create a new order due to missing stock', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(201);

    return request(app.getHttpServer())
      .post('/orders')
      .auth(loginResponse.body.accessToken, { type: 'bearer' })
      .send({
        customer: customerId,
        createdAt: '2024-07-30T14:48:00.000Z',
        country: 'Romania',
        city: 'Cluj-Napoca',
        county: 'Cluj',
        streetAddress: 'Str Brassai Samuel 9',
        orderDetails: [
          {
            productId: firstProductId,
            shippedFrom: locationId,
            quantity: 7,
          },
          {
            productId: secondProductId,
            shippedFrom: locationId,
            quantity: 3,
          },
        ],
      })
      .expect(400)
      .expect((res) => {
        if (
          !res.body.message ||
          res.body.message !== 'There are less items in stock than required!'
        ) {
          throw new Error(
            'Expected error message was: "There are less items in stock than required!"',
          );
        }
      });
  });
});
