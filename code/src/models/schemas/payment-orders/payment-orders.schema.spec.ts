import MongoMemoryServer from "mongodb-memory-server-core";
import { connect, connection, model, Model, ConnectOptions } from "mongoose";
import { PaymentOrderModel } from "src/models/types/contracts";
import { PaymentOrder } from "src/models/types/payment-orders";
import { fakePaymentOrder } from "../../tests/constant";
import { PaymentOrderCollection, PaymentOrderSchema } from "./payment-orders.schema";

describe('PaymentOrder schema test', () => {
    let paymentOrderModel: Model<PaymentOrderModel>;

    beforeEach(async () => {
        const uri = await new MongoMemoryServer().getUri();
        await connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true} as ConnectOptions, err => {
            if (!err) return;

            console.log(err);
            process.exit(1);
        });

        paymentOrderModel = model<PaymentOrderModel>(PaymentOrderCollection, PaymentOrderSchema);
    });

    afterEach(() => connection.close());

    test('test mapping', async () => {
        const paymentOrder: PaymentOrder = {
            ...fakePaymentOrder
        };

        const validPaymentOrder = new paymentOrderModel(paymentOrder);
        const savedPaymentOrder = await validPaymentOrder.save();

        expect(savedPaymentOrder.id).toBeDefined();
        expect(savedPaymentOrder.externalId).toBe(fakePaymentOrder.externalId);
        expect(savedPaymentOrder.value).toBe(fakePaymentOrder.value);
        expect(savedPaymentOrder.expectedOn).toBe(fakePaymentOrder.expectedOn);
    });
});