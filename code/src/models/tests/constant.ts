import { CreatePaymentOrderDto, PaymentOrderDto } from "../types/dto/payment-orders.dto";
import { StatusEnum } from "../types/payment-orders";


export const fakeCreatePaymentOrder: CreatePaymentOrderDto = {
    "externalId": "external_id",
    "amount": 1000,
    "expectedOn" : "05-11-2022",
};

export const fakePaymentOrder: PaymentOrderDto = {
    externalId: "external_id",
    value: 10.00,
    status: StatusEnum.created,
    expectedOn : new Date('05-05-2022'),   
};