import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    name: string;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    @IsNotEmpty()
    income: number;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    @IsNotEmpty()
    company_value: number;
}
