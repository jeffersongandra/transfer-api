import { Document } from 'mongoose';
import { PaymentOrder } from './payment-orders';

export type PaymentOrderModel = PaymentOrder & Document;