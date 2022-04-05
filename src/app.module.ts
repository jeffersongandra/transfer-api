import { Logger, Module } from '@nestjs/common';
import { PaymentOrderService } from './models/services/payment-order/payment-order.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PaymentOrderService, Logger],
})
export class AppModule {}
