import { Injectable, InternalServerErrorException, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { paymentOrderCollection } from '../../../../models/schemas/payment-orders/payment-orders.schema';
import { PaymentOrderModel } from '../../../../models/types/contracts';
import { CreatePaymentOrderDto, PaymentOrderDto } from '../../../../models/types/dto/payment-orders.dto';
import { PaymentOrder, StatusEnum } from '../../../../models/types/payment-orders';
import { isDueDateExpired, convertDateToJs } from '../../../../utils/date';


@Injectable()
export class PaymentOrdersService {
  
  constructor(
    @InjectModel(paymentOrderCollection) private paymentOrderModel: Model<PaymentOrderModel>
  ) { }
  public insert = async (createPaymentOrder: CreatePaymentOrderDto): Promise<PaymentOrder> => {

    if(createPaymentOrder.dueDate && isDueDateExpired(createPaymentOrder.dueDate))
      throw new MethodNotAllowedException();

    const paymentOrder = this.mapPaymentOrder(createPaymentOrder);

    return this.paymentOrderModel.create(paymentOrder);
  }

  public search = async (internalId: string): Promise<PaymentOrder> => {
    const search = await this.paymentOrderModel.findById(internalId);
    if(!search) {
      throw new NotFoundException();
    }
    return search;
  }

  private mapPaymentOrder = (createPaymentOrder): PaymentOrderDto => {
    return {
      externalId: createPaymentOrder.externalId,
      value: createPaymentOrder.amount/100,
      status: StatusEnum.created,
      expectedOn: convertDateToJs(createPaymentOrder.expectedOn),
    }
  }
}
