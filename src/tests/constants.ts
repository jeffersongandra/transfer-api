import { Transfer } from "../models/types/transfer";
import { ConsultPaymentOrder, CreatedPaymentOrder, StatusEnum } from "../models/types/payment-orders";
import { TransferDto } from "../models/types/dto/transfer.dto";

export const fakeCreatePaymentOrder: CreatedPaymentOrder = {
    internalId: 'internal_id',
    status : StatusEnum.aproved
};

export const fakeConsultPaymentOrder: ConsultPaymentOrder = {
    internalId: "internal_id",
    externalId: "external_id",
    amount: 1000,
    status: StatusEnum.created,
    expectedOn : '05-05-2022',   
};

export const fakeCreateTransfer: TransferDto = {
    fromId: "from_id",
    toId: "to_id",
    value: 10.00,
    expectedOn : '05-05-2022',   
};

export const fakeTransfer: Transfer = {
    id: '000000000000',
    fromId: "from_id",
    toId: "to_id",
    value: 10.00,
    expectedOn : '05-05-2022',   
};