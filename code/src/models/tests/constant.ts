import { ConsultPaymentOrder, CreatedPaymentOrder, StatusEnum } from "../types/PaymentOrder";

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