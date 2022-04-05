import { ConsultPaymentOrder, CreatedPaymentOrder, StatusEnum } from "../models/types/payment-orders";

export const fakeCreatePaymentOrder: CreatedPaymentOrder = {
    internalId: 'internal_id',
    status : StatusEnum.aproved
};

export const fakePaymentOrder: ConsultPaymentOrder = {
    internalId: "internal_id",
    externalId: "external_id",
    amount: 1000,
    status: StatusEnum.created,
    expectedOn : '05-05-2022',   
};