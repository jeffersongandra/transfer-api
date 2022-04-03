import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentOrderDto {
  @ApiProperty({ required: true, type: String, example: 'external_id'})
  externalId: string;

  @ApiProperty({required: true, type: String, example: 1000})
  amount: number;

  @ApiProperty({ required: true, type: String, example: 'dd-mm-yyyy'})
  expectedOn: string;
}