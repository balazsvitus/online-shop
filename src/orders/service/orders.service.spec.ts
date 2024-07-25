import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import OrdersRepository from '../repository/orders.repository';
import { OrderDetailsService } from './orderDetails.service';
import Order from '../domain/order.domain';
import Customer from '../../customers/domain/customer.domain';
import OrderDetail from '../domain/orderDetail.domain';

describe('ordersService', () => {
  let ordersService: OrdersService;
  let ordersRepository: jest.Mocked<OrdersRepository>;
  let orderDetailsService: jest.Mocked<OrderDetailsService>;

  const orders = [
    {
      id: '26236916-fee4-4347-8f12-37c12c4e56da',
      customer: {
        id: 'ce1e4763-23c5-4a8c-8773-d0da4e5d1612',
        firstName: 'Java',
        lastName: 'Spring',
        username: 'JavaScript5',
        password: '',
        emailAddress: 'email@address.com',
        role: 'customer',
      } as Customer,
      createdAt: new Date('2024-07-22T14:48:00.000Z'),
      country: 'Romania',
      city: 'Brasov',
      county: 'Brasov',
      streetAddress: 'Str Mervin 22',
      orderDetails: [
        {
          orderId: '26236916-fee4-4347-8f12-37c12c4e56da',
          productId: '1bfa81f5-4758-44f7-8f86-3f5026e667ef',
          shippedFromId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
          quantity: 5,
        },
        {
          orderId: '26236916-fee4-4347-8f12-37c12c4e56da',
          productId: '25a82f62-f005-4c5d-b181-0f1cdb0669b7',
          shippedFromId: 'd18e3b29-e02e-4c68-a017-d1f030659109',
          quantity: 5,
        },
      ] as OrderDetail[],
    },
  ] as Order[];

  beforeEach(async () => {
    ordersRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<OrdersRepository>;
    orderDetailsService = {
      validateOrderDetails: jest.fn(),
      decreaseStock: jest.fn(),
      saveOrderDetails: jest.fn(),
    } as unknown as jest.Mocked<OrderDetailsService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useValue: ordersRepository,
        },
        {
          provide: OrderDetailsService,
          useValue: orderDetailsService,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });

  it('should get all orders', async () => {
    ordersRepository.findAll.mockResolvedValue(orders);

    const result = await ordersService.getOrders();

    expect(result).toBe(orders);
    expect(ordersRepository.findAll).toHaveBeenCalled();
  });

  it('should get order by id', async () => {
    ordersRepository.findOne.mockImplementation(async (id: string) => {
      return orders.find((order) => {
        return order.id === id;
      });
    });

    const result = await ordersService.getOrderById(
      '26236916-fee4-4347-8f12-37c12c4e56da',
    );

    expect(result).toBe(orders[0]);
    expect(ordersRepository.findOne).toHaveBeenCalled();
  });

  it('should create an order', async () => {
    ordersRepository.save.mockImplementation(async (order: Order) => {
      return order;
    });
    orderDetailsService.validateOrderDetails.mockResolvedValue(true);

    const result = await ordersService.createOrder(
      orders[0],
      orders[0].orderDetails,
    );

    expect(result).toBe(orders[0]);
    expect(ordersRepository.save).toHaveBeenCalledWith(orders[0]);
  });

  it('should validate order with order details service', async () => {
    orderDetailsService.validateOrderDetails.mockResolvedValue(true);

    await expect(
      ordersService.validateOrder(orders[0].orderDetails),
    ).resolves.not.toThrow();
    expect(orderDetailsService.validateOrderDetails).toHaveBeenCalledWith(
      orders[0].orderDetails,
    );
  });

  it('should update order', async () => {
    ordersRepository.findOne.mockImplementation(async (id: string) => {
      return orders.find((order: Order) => {
        return order.id === id;
      });
    });
    ordersRepository.save.mockImplementation(async (order: Order) => {
      return order;
    });

    const result = await ordersService.updateOrder(orders[0]);

    expect(result).toBe(orders[0]);
    expect(ordersRepository.save).toHaveBeenCalledWith(orders[0]);
  });

  it('should remove order', async () => {
    ordersRepository.findOne.mockImplementation(async (id: string) => {
      return orders.find((order: Order) => {
        return order.id === id;
      });
    });
    ordersRepository.remove.mockResolvedValue();

    await expect(
      ordersService.removeOrder(orders[0].id),
    ).resolves.not.toThrow();
    expect(ordersRepository.remove).toHaveBeenCalledWith(orders[0].id);
  });
});
