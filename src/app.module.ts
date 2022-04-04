import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentOrdersController } from './api/controller/payment-orders/payment-orders.controller';
import { PaymentOrdersService } from './models/services/payment-orders/payment-orders/payment-orders.service';
import { paymentOrderCollection, PaymentOrderSchema } from './models/schemas/payment-orders/payment-orders.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URL_DATABASE),
    MongooseModule.forFeature([
      { name: paymentOrderCollection, schema: PaymentOrderSchema, collection: paymentOrderCollection }
    ]),
  ],
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService],
})
export class AppModule {}
