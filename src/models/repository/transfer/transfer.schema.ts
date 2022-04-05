import { Transfer } from "../../types/transfer";
import { schemaOptions } from "../mongoSchemaOptions";
import { Schema } from "mongoose"

export const transferCollection = 'transfer';

export const TransferSchema = new Schema<Transfer>({
    internalId: {type: String, require: true},
    externalId: {type: String, require: true},
    value: {type: Number, require: true},
    expectedOn: {type: String, require: false},
}, schemaOptions)