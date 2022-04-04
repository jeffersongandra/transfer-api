import { Schema } from "mongoose"
import { schemaOptions } from "../../mongoSchemaOptions"
import { PaymentOrderModel } from "../../types/contracts"
import { StatusEnum } from "../../types/payment-orders"

export const PaymentOrderCollection = 'PaymentOrder'

export const PaymentOrderSchema = new Schema<PaymentOrderModel>({
  externalId: { type: String, require: true },
  value: { type: Number, require: true },
  expectedOn: { type: String, require: true },
  status: { type: String, enum: StatusEnum, default: StatusEnum.created, require: true }
}, schemaOptions)