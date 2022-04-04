import MongoMemoryServer from "mongodb-memory-server-core";
import { connect, connection, model, Model, ConnectOptions } from "mongoose";
import { PaymentOrderDto } from "../../types/dto/payment-orders.dto";
import { fakePaymentOrder } from "../../tests/constant";
import { paymentOrderCollection, PaymentOrderSchema } from "./payment-orders.schema";
import { PaymentOrderModel } from "../../../models/types/contracts";

describe('PaymentOrder schema test', () => {
    let paymentOrderModel: Model<PaymentOrderModel>;

    beforeEach(async () => {
        const uri = await new MongoMemoryServer().getUri();
        connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true} as ConnectOptions, err => {
            if (!err) return;

            console.log(err);
            process.exit(1);
        });

        paymentOrderModel = model<PaymentOrderModel>(paymentOrderCollection, PaymentOrderSchema);
    });

    afterEach(() => connection.close());

    test('Should create item on database', async () => {
        const paymentOrder: PaymentOrderDto = {
            ...fakePaymentOrder
        };

        const validPaymentOrder = new paymentOrderModel(paymentOrder);
        const savedPaymentOrder = await validPaymentOrder.save();

        expect(savedPaymentOrder.id).toBeDefined();
        expect(savedPaymentOrder.externalId).toBe(fakePaymentOrder.externalId);
        expect(savedPaymentOrder.value).toBe(fakePaymentOrder.value);
        expect(new Date(savedPaymentOrder.expectedOn)).toStrictEqual(fakePaymentOrder.expectedOn);
    });
});