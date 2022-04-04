import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../payment-orders';

export class CreatePaymentOrderDto {
  @ApiProperty({ required: true, type: String, example: 'external_id'})
  externalId: string;

  @ApiProperty({required: true, type: String, example: 1000})
  amount: number;

  @ApiProperty({ required: true, type: String, example: '10-04-2022'})
  expectedOn: string;

  @ApiProperty({required: false, type: String, example: '04-04-2022'})
  dueDate?: string;
}

export class PaymentOrderDto {
  @ApiProperty({ required: false, type: String, example: 'id'})
  id?: string;

  @ApiProperty({ required: true, type: String, example: 'external_id'})
  externalId: string;

  @ApiProperty({required: true, type: String, example: 10.00})
  value: number;

  @ApiProperty({required: true, type: StatusEnum, example: 'CREATED'})
  status: StatusEnum;

  @ApiProperty({ required: true, type: Date, example: new Date()})
  expectedOn: Date;
}