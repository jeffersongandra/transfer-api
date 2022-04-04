import { CreatePaymentOrderDto } from "../types/dto/payment-orders.dto";
import { ConsultPaymentOrder, CreatedPaymentOrder, StatusEnum, PaymentOrder } from "../types/payment-orders";


export const fakeCreatePaymentOrder: CreatePaymentOrderDto = {
    "externalId": "external_id",
    "amount": 1000,
    "expectedOn" : "05-11-2022",
};

export const fakePaymentOrder: PaymentOrder = {
    externalId: "external_id",
    value: 10.00,
    status: StatusEnum.created,
    expectedOn : "05-11-2022",
    
};

export const fakeCreatedPaymentOrder: CreatedPaymentOrder = {
    "internalId": "internal_id",
    "status": StatusEnum.created,
};

export const fakeConsultPaymentOrder: ConsultPaymentOrder = {
    "internalId": "internal_id",
    "externalId": "external_id",
    "status": StatusEnum.created,
    "amount": 1000,
    "expectedOn" : "05-11-2022",
};