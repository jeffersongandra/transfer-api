import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from "supertest";
import { TransferApp } from '../../../models/app/transfer.app';
import { fakeConsultPaymentOrder, fakeCreateTransfer, fakeTransfer } from '../../../tests/constants';
import { fakeLogger } from '../../../utils/fakeLogger';
import { TransferController } from './transfer.controller';

describe('TransferController', () => {

    const url = '/transfer';
    let expressApp: INestApplication;
    let app: TransferApp;

    beforeEach(async () => {
        app = {
            createTransfer: () => Promise.resolve(fakeTransfer),
            getPaymentOrder: () => Promise.resolve(fakeConsultPaymentOrder),
        } as unknown as TransferApp;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransferController],
            providers: [Logger, TransferApp]
        })
        .overrideProvider(Logger)
        .useValue(fakeLogger)
        .overrideProvider(TransferApp)
        .useValue(app)
        .compile();

        expressApp = module.createNestApplication();
        expressApp.useGlobalPipes(new ValidationPipe({
            forbidUnknownValues: false
        }));

        await expressApp.init();
    });

    describe('createTransfer', () => {
        it('should create a transfer request', async () => {
            jest.spyOn(app, 'createTransfer');

            const agent = request(expressApp.getHttpServer());
            await agent.post(url)
                .send(fakeCreateTransfer)
                .expect(201);

            expect(app.createTransfer).toHaveBeenCalledWith(fakeCreateTransfer);
        });
    })

    describe('getTransferPaymentOrder', () => {
        it('should get payment order', async () => {
            jest.spyOn(app, 'getPaymentOrder');

            const agent = request(expressApp.getHttpServer());
            await agent.get(`${url}/000000`)
                .expect(200);

            expect(app.getPaymentOrder).toHaveBeenCalled();
        })
    })
});
