import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CustomersModule } from "./customers/customers.module";
import { TypeOrmModule } from "@nestjs/typeorm";

import "dotenv/config";
import { AppDataSource } from "./database/typeorm.config";
import { WinstonLoggerService } from "./logger.service";
import { HealthModule } from "./health-checker/health.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
    }),
    CustomersModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, WinstonLoggerService],
  exports: [WinstonLoggerService],
})
export class AppModule { }
