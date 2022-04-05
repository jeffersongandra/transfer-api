import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TransferModel } from 'src/models/types/contracts';
import { CreatedPaymentOrder } from '../../../models/types/payment-orders';
import { TransferApp } from '../../../models/app/transfer.app';
import { Transfer } from '../../../models/types/transfer';

@Controller('transfer')
export class TransferController {

    constructor(private logger: Logger, private app: TransferApp) {
    }

    @Post('/')
    @ApiResponse({status: 201, description: 'Transfer successful'})
    public createTransfer(@Body() transfer: Transfer): Promise<TransferModel> {
        this.logger.debug('API - transfer has requested');

        return this.app.createTransfer(transfer);
    }

    @Get('/:internalId')
    @ApiResponse({status: 200, description: 'Get Transfer'})
    public getTransferPaymentOrder(@Param('internalId') internalId: string): Promise<CreatedPaymentOrder> {
        this.logger.debug('API - transfer has requested');

        return this.app.getPaymentOrder(internalId);
    }
}
