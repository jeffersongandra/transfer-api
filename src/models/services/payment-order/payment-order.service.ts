import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { fakeCreatePaymentOrder } from 'src/tests/constants';
import { PaymentOrder, CreatedPaymentOrder } from '../../../models/types/payment-orders';
import { getUrlGenerator } from '../../../utils/getUrlGenerator';

@Injectable()
export class PaymentOrderService {
    private readonly url: any;
    private readonly requestConfig: AxiosRequestConfig | any;

    constructor(private logger: Logger) {

        const baseURL = process.env.PAYMENT_API_HOST;
        
        if (!baseURL) {
            this.logger.error('Url and token must be provided as Environment Variables');
            throw new Error('Url and token must be provided as Environment Variables');
        }

        this.url = getUrlGenerator(baseURL);
        this.requestConfig = {
            baseURL,
        };
    }
    
    createPaymentOrder = (order: PaymentOrder): CreatedPaymentOrder => {
        return fakeCreatePaymentOrder
    }

    getPaymentOrder = (order: PaymentOrder): CreatedPaymentOrder => {
        return fakeCreatePaymentOrder
    }
}
