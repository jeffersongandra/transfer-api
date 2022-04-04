import { ApiProperty } from "@nestjs/swagger";
import { convertDateToReadable } from "../../utils/date";
import { PaymentOrder, StatusEnum } from "../../models/types/payment-orders";

export class CreatedPaymentOrderViewModel {

  @ApiProperty({ required: true, type: String, example: 'internal_id'})
  internalId: string;

  @ApiProperty({required: true, type: StatusEnum, example: 'CREATED'})
  status: StatusEnum;
}

export class ConsultPaymentOrderViewModel extends CreatedPaymentOrderViewModel {

  @ApiProperty({ required: true, type: String, example: 'external_id'})
  externalId: string;

  @ApiProperty({ required: true, type: Number, example: 1000})
  amount: number;

  @ApiProperty({ required: true, type: String, example: 'dd-mm-yyyy'})
  expectedOn: string;
}

export const mapToCreatedPaymemtOrder = (paymentOrder: PaymentOrder): CreatedPaymentOrderViewModel => {
  const {id, status} = paymentOrder;
  return {
    internalId: id,
    status: status
  }
}

export const mapToFindPaymemtOrder = (paymentOrder: PaymentOrder): ConsultPaymentOrderViewModel => {
  const {id, externalId, status, value, expectedOn} = paymentOrder;
  return {
    internalId: id,
    externalId,
    amount: value*100,
    status: status,
    expectedOn: convertDateToReadable(expectedOn)
  }
}