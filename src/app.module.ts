import { Logger, Module } from '@nestjs/common';
import { PaymentOrderService } from './models/services/payment-order/payment-order.service';
import { TransferController } from './api/controller/transfer/transfer.controller';
import { TransferApp } from './models/app/transfer.app';
import { MongooseModule } from '@nestjs/mongoose';
import { transferCollection, TransferSchema } from './models/repository/transfer/transfer.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URL_DATABASE),
        MongooseModule.forFeature([
            {name: transferCollection, schema: TransferSchema, collection: transferCollection}
        ]),
  ],
  controllers: [TransferController],
  providers: [PaymentOrderService, Logger, TransferApp],
})
export class AppModule {}
