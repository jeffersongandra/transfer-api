import { Model } from "mongoose";
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import { paymentOrderCollection, PaymentOrderSchema } from '../../../schemas/payment-orders/payment-orders.schema';
import { PaymentOrderModel } from '../../../types/contracts';
import { PaymentOrdersService } from './payment-orders.service';
import { fakeCreatePaymentOrder, fakePaymentOrder } from "../../../tests/constant";
import { PaymentOrder } from "src/models/types/payment-orders";
import { MethodNotAllowedException, NotFoundException } from "@nestjs/common";

describe('PaymentOrdersService', () => {
  let paymentOrdersModel: Model<PaymentOrderModel>;
  let target: PaymentOrdersService;

  beforeEach(async () => {
    const uri = await new MongoMemoryServer().getUri();

    const moduleFixture = await Test.createTestingModule({
      imports: [
          MongooseModule.forRoot(uri),
          MongooseModule.forFeature([
            { name: paymentOrderCollection, schema: PaymentOrderSchema, collection: paymentOrderCollection }
          ])
      ],
      providers: [PaymentOrdersService]
    })
    .compile();

    target = moduleFixture.get<PaymentOrdersService>(PaymentOrdersService);
    paymentOrdersModel = moduleFixture.get<Model<PaymentOrderModel>>(getModelToken(paymentOrderCollection));
  });

  const create = (part: Partial<PaymentOrder> = {}): Promise<PaymentOrder> => paymentOrdersModel.create({...fakePaymentOrder, part})

  describe('Create Payment Order', () => {

    it('should create payment order', async () => {
      const result = await target.insert(fakeCreatePaymentOrder);

      const showDb = await paymentOrdersModel.findById(result.id);
      expect(showDb).toBeDefined();
      expect((result as PaymentOrder).id).toBeDefined();
    });

    it('should create value with double digits', async () => {
      const result = await target.insert(fakeCreatePaymentOrder);

      const showDb = await paymentOrdersModel.findById(result.id);
      expect(showDb).toBeDefined();
      expect((result as PaymentOrder).value).toBe(fakeCreatePaymentOrder.amount/100);
    });

    it('should not create payment order if it already expired', async () => {
      const action = () => target.insert({...fakeCreatePaymentOrder, dueDate: '03-03-2022'});

      await expect(action()).rejects.toBeInstanceOf(MethodNotAllowedException);
    });

    it('should create payment order if dueDate not exists', async () => {
      const result = await target.insert({...fakeCreatePaymentOrder, dueDate: null});

      const showDb = await paymentOrdersModel.findById(result.id);
      expect(showDb).toBeDefined();
      expect((result as PaymentOrder).value).toBe(fakeCreatePaymentOrder.amount/100);
    });

  });

  describe('Find Payment Order', () => {
    it('should find payment order', async () => {
      const result = await create(fakeCreatePaymentOrder);

      const savedDb = await target.search(result.id);
      expect(savedDb).toBeDefined();
      expect((result as PaymentOrder).id).toBeDefined();
    });

    it('should return error if payment order is not found', async () => {
      await create(fakeCreatePaymentOrder);

      const action = () =>  target.search('624b2fdff3b4d8697c751c16');
      await expect(action()).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
