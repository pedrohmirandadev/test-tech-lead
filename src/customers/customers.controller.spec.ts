import { Test, TestingModule } from "@nestjs/testing";
import { CustomersController } from "./customers.controller";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

describe("CustomersController", () => {
  let controller: CustomersController;
  let service: CustomersService;

  const mockCustomerService = {
    create: jest.fn((dto) => ({ id: Date.now(), ...dto })),
    findAll: jest.fn(() =>
      Promise.resolve([
        { id: 1, name: "John Doe", income: 50000, company_value: 1000000 },
      ]),
    ),
    findOne: jest.fn((id) =>
      Promise.resolve({
        id,
        name: "John Doe",
        income: 50000,
        company_value: 1000000,
      }),
    ),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn(() => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a customer", async () => {
    const createCustomerDto: CreateCustomerDto = {
      name: "John Doe",
      income: 50000,
      company_value: 1000000,
    };
    const result = await controller.create(createCustomerDto);

    expect(result).toHaveProperty("id");
    expect(result.name).toBe(createCustomerDto.name);
    expect(result.income).toBe(createCustomerDto.income);
    expect(result.company_value).toBe(createCustomerDto.company_value);
    expect(mockCustomerService.create).toHaveBeenCalledWith(createCustomerDto);
  });

  it("should return a list of customers", async () => {
    const result = await controller.findAll();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBeDefined();
    expect(result[0].name).toBe("John Doe");
    expect(result[0].income).toBe(50000);
    expect(result[0].company_value).toBe(1000000);
    expect(mockCustomerService.findAll).toHaveBeenCalled();
  });

  it("should return a customer by ID", async () => {
    const result = await controller.findOne("1");

    expect(result).toBeDefined();
    expect(result?.id).toBe(1);
    expect(result?.name).toBe("John Doe");
    expect(result?.income).toBe(50000);
    expect(result?.company_value).toBe(1000000);
    expect(mockCustomerService.findOne).toHaveBeenCalledWith(1);
  });

  it("should update a customer", async () => {
    const updateCustomerDto: UpdateCustomerDto = {
      name: "Jane Doe",
      income: 60000,
      company_value: 1200000,
    };
    const result = await controller.update("1", updateCustomerDto);

    expect(result).toBeDefined();
    expect(result?.id).toBe(1);
    expect(result?.name).toBe(updateCustomerDto.name);
    expect(result?.income).toBe(updateCustomerDto.income);
    expect(result?.company_value).toBe(updateCustomerDto.company_value);
    expect(mockCustomerService.update).toHaveBeenCalledWith(
      1,
      updateCustomerDto,
    );
  });

  it("should delete a customer", async () => {
    const result = await controller.remove("1");

    expect(result).toEqual({ affected: 1 });
    expect(mockCustomerService.remove).toHaveBeenCalledWith(1);
  });
});
