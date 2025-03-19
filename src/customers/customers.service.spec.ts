import { Test, TestingModule } from "@nestjs/testing";
import { CustomersService } from "./customers.service";
import { Customer } from "./entities/customer.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

describe("CustomersService", () => {
  let service: CustomersService;
  let repository: Repository<Customer>;

  const customerArray: Customer[] = [
    { id: 1, name: "John Doe", income: 50000, company_value: 1000000 },
    { id: 2, name: "Jane Smith", income: 70000, company_value: 1500000 },
  ];

  const mockRepository = {
    create: jest.fn((dto) => ({ id: Date.now(), ...dto })),
    save: jest.fn((customer) => Promise.resolve(customer)),
    find: jest.fn(() => Promise.resolve(customerArray)),
    findOneBy: jest.fn(({ id }) =>
      Promise.resolve(
        customerArray.find((customer) => customer.id === id) || null,
      ),
    ),
    update: jest.fn(),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: getRepositoryToken(Customer), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it("Must be defined", () => {
    expect(service).toBeDefined();
  });

  it("Must create a customer", async () => {
    const dto = { name: "New Customer", income: 30000, company_value: 500000 };
    const result = await service.create(dto);
    expect(result).toHaveProperty("id");
    expect(result.name).toBe(dto.name);
    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(mockRepository.save).toHaveBeenCalledWith(result);
  });

  it("Must return all customers", async () => {
    const result = await service.findAll();
    expect(result).toEqual(customerArray);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it("Must return a customer by Id", async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(customerArray[0]);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it("Must return null if the customer dont exist", async () => {
    jest.spyOn(mockRepository, "findOneBy").mockResolvedValueOnce(null);
    const result = await service.findOne(99);
    expect(result).toBeNull();
  });

  it("Must update a customer", async () => {
    const dto = { name: "Updated Name", income: 50000, company_value: 1000000 };
    jest.spyOn(mockRepository, "findOneBy").mockResolvedValueOnce({
      id: 1,
      ...dto,
    });

    const result = await service.update(1, dto);
    expect(result?.name).toBe(dto.name);
    expect(mockRepository.update).toHaveBeenCalledWith(1, dto);
  });

  it("Must remove a customer", async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });
});
