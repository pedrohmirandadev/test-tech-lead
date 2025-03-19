import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { Repository } from "typeorm";
import { WinstonLoggerService } from "src/logger.service";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private readonly logger: WinstonLoggerService
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      return await this.customerRepository.save(customer)
    } catch (error) {
      this.logger.log('Error Creating new customer ' + error.message);
      throw error
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      return await this.customerRepository.find();
    } catch (error) {
      this.logger.log('Error Finding all customers ' + error.message);
      throw error
    }
  }

  async findOne(id: number): Promise<Customer | null> {
    try {
      return await this.customerRepository.findOneBy({ id });
    } catch (error) {
      this.logger.log('Error Finding one customer ' + error.message);
      throw error
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer | null> {
    try {
      await this.customerRepository.update(id, updateCustomerDto);
      return this.customerRepository.findOneBy({ id });
    } catch (error) {
      this.logger.log('Error updating a customer ' + error.message);
      throw error
    }
  }

  async remove(id: number) {
    try {
      return await this.customerRepository.delete(id);
    } catch (error) {
      this.logger.log('Error removing a customer ' + error.message);
      throw error
    }
  }
}
