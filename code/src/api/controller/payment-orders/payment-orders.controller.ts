import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePaymentOrderDto } from '../../../models/types/dto/payment-orders.dto';
import { PaymentOrdersService } from '../../../models/services/payment-orders/payment-orders/payment-orders.service';
import { ApiTags } from '@nestjs/swagger';
import { ConsultPaymentOrderViewModel, CreatedPaymentOrderViewModel, mapToCreatedPaymemtOrder, mapToFindPaymemtOrder } from '../../../api/view/payment-orders.view';

@ApiTags('V1 | paymentOrders')
@Controller('paymentOrders')
export class PaymentOrdersController {
    constructor(private service: PaymentOrdersService) {
    }
    @Post('')
    public liquidOrders(@Body() createPaymentOrder: CreatePaymentOrderDto): Promise<CreatedPaymentOrderViewModel> {
        return this.service.insert(createPaymentOrder)
            .then(mapToCreatedPaymemtOrder);
    }
    
    @Get(':internalId')
    public patch(@Param('internalId') internalId: string): Promise<ConsultPaymentOrderViewModel> {
        return this.service.search(internalId)
            .then(mapToFindPaymemtOrder)
    }
}
