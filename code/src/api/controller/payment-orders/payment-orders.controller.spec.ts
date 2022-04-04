import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from "supertest";
import { fakeCreatePaymentOrder, fakePaymentOrder } from '../../../models/tests/constant';
import { PaymentOrdersService } from '../../../models/services/payment-orders/payment-orders/payment-orders.service';
import { PaymentOrdersController } from './payment-orders.controller';
import { getUrlGenerator } from '../../../utils/urlGenerator';

const urlGenerator = getUrlGenerator('/paymentOrders');

describe('PaymentOrdersController', () => {
  let controller: PaymentOrdersController;
  let expressApp: INestApplication;

  let service: PaymentOrdersService;

  beforeEach(async () => {
    service = {
      insert: () => Promise.resolve(fakePaymentOrder),
      search: () => Promise.resolve(fakePaymentOrder),
    } as unknown as PaymentOrdersService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentOrdersController],
      providers: [PaymentOrdersService]
    })
    .overrideProvider(PaymentOrdersService)
    .useValue(service)
    .compile();

    controller = module.get<PaymentOrdersController>(PaymentOrdersController);
    expressApp = module.createNestApplication();
    expressApp.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));
        await expressApp.init();
  });

  describe('create payment orders', () => {
    it('should save payment offer', async () => {
      jest.spyOn(service, 'insert');

      const agent = request(expressApp.getHttpServer());
      const result = await agent.post('/paymentOrders')
        .send(fakeCreatePaymentOrder)

      expect(result.statusCode).toBe(201)
    });
  });


  describe('get paymentOrders', () => {
    it('should get payment offer', async () => {
      jest.spyOn(service, 'search');

      const id = '624b2fdff3b4d8697c751c16';

      const agent = request(expressApp.getHttpServer());
      const result = await agent.get(urlGenerator(id))

      expect(result.statusCode).toBe(200)

      expect(service.search).toBeCalledWith(id);
    });
  });
});
