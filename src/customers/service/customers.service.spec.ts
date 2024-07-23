import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import CustomersRepository from '../repository/customers.repository';
import Customer from '../domain/customer.domain';

describe('CustomersService', () => {
  let customersService: CustomersService;
  let customersRepository: jest.Mocked<CustomersRepository>;

  beforeEach(async () => {
    customersRepository = {
      findOne: jest.fn(),
      findOneByUsername: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<CustomersRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: CustomersRepository, useValue: customersRepository },
      ],
    }).compile();

    customersService = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(customersService).toBeDefined();
  });

  it('should create a customer', async () => {
    const customer = {
      id: '73ec7a0d-a499-4304-9629-670e5eebdc9d',
      emailAddress: 'Balazs.Vitus@msg.group',
      firstName: 'Balazs',
      lastName: 'Vitus',
      password: 'password',
      username: 'vitusbalazs',
      role: 'admin',
    } as Customer;
    customersRepository.create.mockResolvedValue(customer);

    const result = await customersService.createCustomer(customer);

    expect(result).toEqual(customer);
    expect(customersRepository.create).toHaveBeenCalledWith(customer);
  });

  it('should find a customer by id', async () => {
    const customer = {
      id: '73ec7a0d-a499-4304-9629-670e5eebdc9d',
      emailAddress: 'Balazs.Vitus@msg.group',
      firstName: 'Balazs',
      lastName: 'Vitus',
      password: 'password',
      username: 'vitusbalazs',
      role: 'admin',
    } as Customer;
    customersRepository.findOne.mockResolvedValue(customer);

    const result = await customersService.getCustomerById(
      '73ec7a0d-a499-4304-9629-670e5eebdc9d',
    );

    expect(result).toEqual(customer);
    expect(customersRepository.findOne).toHaveBeenCalledWith(
      '73ec7a0d-a499-4304-9629-670e5eebdc9d',
    );
  });
});
