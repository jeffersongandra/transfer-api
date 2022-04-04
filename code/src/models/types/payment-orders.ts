import { ApiProperty } from '@nestjs/swagger';

export enum StatusEnum {
  created = 'CREATED',
  aproved = 'APPROVED',
  scheduled = 'SCHEDULED',
  rejected = 'REJECTED',
}  

export class PaymentOrder {
  @ApiProperty({ required: true, type: String, example: 'external_id'})
  externalId: string;

  @ApiProperty({required: true, type: String, example: 10.00})
  value: number;

  @ApiProperty({required: true, type: StatusEnum, example: 'CREATED'})
  status: StatusEnum;

  @ApiProperty({ required: true, type: String, example: 'dd-mm-yyyy'})
  expectedOn: string;
}

export class CreatedPaymentOrder {
  @ApiProperty({ required: true, type: String, example: 'internal_id'})
  internalId: string;

  @ApiProperty({required: true, type: StatusEnum, example: 'CREATED'})
  status: StatusEnum;
}

export class ConsultPaymentOrder extends CreatedPaymentOrder {

  @ApiProperty({ required: true, type: String, example: 'external_id'})
  externalId: string;

  @ApiProperty({ required: true, type: Number, example: 1000})
  amount: number;

  @ApiProperty({ required: true, type: String, example: 'dd-mm-yyyy'})
  expectedOn: string;
}