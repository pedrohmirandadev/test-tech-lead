import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomersService } from "./customers.service";
import { CustomersController } from "./customers.controller";
import { Customer } from "./entities/customer.entity";
import { WinstonLoggerService } from "src/logger.service";

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService, WinstonLoggerService],
  exports: [CustomersService],
})
export class CustomersModule { }
