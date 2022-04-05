import { Model } from "mongoose";
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import { Logger, NotFoundException } from "@nestjs/common";
import { TransferApp } from './transfer.app';
import { transferCollection, TransferSchema } from '../repository/transfer/transfer.schema'
import { TransferModel } from '../types/contracts';
import { fakeConsultPaymentOrder, fakeCreatePaymentOrder, fakeTransfer } from "../../tests/constants";
import { PaymentOrderService } from "../services/payment-order/payment-order.service";
import { StatusEnum } from "../types/payment-orders";
import { fakeLogger } from '../../utils/fakeLogger';

describe('TransferApp', () => {
    let transferModel: Model<TransferModel>;
    let target: TransferApp;
    let paymentOrderService: PaymentOrderService;

    beforeEach(async () => {
        const uri = await new MongoMemoryServer().getUri();

        paymentOrderService = {
            createPaymentOrder: () => Promise.resolve(fakeCreatePaymentOrder),
            getPaymentOrder: () => Promise.resolve(fakeConsultPaymentOrder),
        } as unknown as PaymentOrderService;

        const moduleFixture = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(uri),
                MongooseModule.forFeature([
                    { name: transferCollection, schema: TransferSchema, collection: transferCollection }
                ])
            ],
            providers: [TransferApp, PaymentOrderService, Logger]
        })
            .overrideProvider(PaymentOrderService)
            .useValue(paymentOrderService)
            .overrideProvider(Logger)
            .useValue(fakeLogger)
            .compile();

        target = moduleFixture.get(TransferApp);
        transferModel = moduleFixture.get<Model<TransferModel>>(getModelToken(transferCollection));
    });

    describe('Create Payment Order', () => {

        it('should save transfer on database', async () => {
            const result = await target.createTransfer(fakeTransfer);
            
            const showDb = await transferModel.findById(result.id);

            expect(showDb.fromId).toBe(fakeTransfer.fromId);
            expect(showDb.toId).toBe(fakeTransfer.toId);
            expect(showDb.value).toBe(fakeTransfer.value);
            expect(showDb.expectedOn).toBe(fakeTransfer.expectedOn);
        });

        it('should send data to payment order API with ammount in cents', async () => {
            jest.spyOn(paymentOrderService, 'createPaymentOrder');

            const result = await target.createTransfer(fakeTransfer);

            const expectedResult = {
                externalId: result.id,
                amount: fakeTransfer.value * 100,
                expectedOn: fakeTransfer.expectedOn
            };

            expect(paymentOrderService.createPaymentOrder).toBeCalledWith(expectedResult);
        });

        it('should not create payment order if it already expired', async () => {
            jest.spyOn(paymentOrderService, 'createPaymentOrder');

            await target.createTransfer({ ...fakeTransfer, expectedOn: '03-03-2022' });
            await expect(paymentOrderService.createPaymentOrder).toBeCalledTimes(0);
        });

        it('should create payment order if dueDate not exists', async () => {
            jest.spyOn(paymentOrderService, 'createPaymentOrder');

            const result = await target.createTransfer({ ...fakeTransfer, expectedOn: null });
            expect(paymentOrderService.createPaymentOrder).toBeCalled();
        });

    });

    describe('Create Payment Order', () => {
        it('should get payment order if exists', async () => {
            jest.spyOn(paymentOrderService, 'getPaymentOrder');

            await target.getPaymentOrder(fakeTransfer.id);
            await expect(paymentOrderService.getPaymentOrder).toBeCalledWith(fakeTransfer.id);
        });
    });
});
