import { ApiProperty } from '@nestjs/swagger';

export enum StatusEnum {
  created = 'CREATED',
  aproved = 'APPROVED',
  scheduled = 'SCHEDULED',
  rejected = 'REJECTED',
}  

export class PaymentOrder {
  @ApiProperty({ required: false, type: String, example: 'id'})
  id?: string;

  @ApiProperty({ required: true, type: String, example: 'external_id'})
  externalId: string;

  @ApiProperty({required: true, type: String, example: 10.00})
  value: number;

  @ApiProperty({required: true, type: StatusEnum, example: 'CREATED'})
  status: StatusEnum;

  @ApiProperty({ required: true, type: String, example: new Date().toISOString})
  expectedOn: string;
}