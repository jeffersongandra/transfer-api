import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { isDueDateExpired } from "../../utils/date";
import { transferCollection } from "../repository/transfer/transfer.schema";
import { PaymentOrderService } from "../services/payment-order/payment-order.service";
import { TransferModel } from "../types/contracts";
import { ConsultPaymentOrder, CreatedPaymentOrder, PaymentOrder, StatusEnum } from "../types/payment-orders";
import { Transfer } from "../types/transfer";

@Injectable()
export class TransferApp {

    constructor(private logger: Logger,
                @InjectModel(transferCollection)
                private transferModel: Model<TransferModel>,
                private paymentOrdersService: PaymentOrderService
    ) {
    } 

    public createTransfer = async (transfer: Transfer): Promise<TransferModel> => {
        this.logger.debug('TransferApp - createTransfer has been requested');
        this.logger.debug(JSON.stringify(transfer));

        const transferData = await this.transferModel.create(transfer);
        
        if(transfer.expectedOn && isDueDateExpired(transfer.expectedOn)) {
            return transferData;
        }

        const mappedTransfer = this.mapToPaymentOrder(transferData);
        await this.paymentOrdersService.createPaymentOrder(mappedTransfer);
        return transferData;   
    }
    
    public getPaymentOrder = async (internalId: string): Promise<ConsultPaymentOrder> => {
        this.logger.debug('TransferApp - getPaymentOrder has been requested');
        this.logger.debug(JSON.stringify(internalId));

        return this.paymentOrdersService.getPaymentOrder(internalId);
    }

    private mapToPaymentOrder = (transfer: Transfer): PaymentOrder => {
        return {
            externalId: transfer.id,
            amount: transfer.value * 100,
            expectedOn: transfer.expectedOn
        }
    }

}