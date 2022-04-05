import { TransferModel } from "../../types/contracts";
import { Model, connect, model, connection, ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-global";
import { transferCollection, TransferSchema } from "./transfer.schema";
import { Transfer } from "../../../models/types/transfer";
import { convertDateToReadable } from "../../../utils/date";
import { TransferDto } from "src/models/types/dto/transfer.dto";

describe('TransferSchema', () => {
    let transferModel: Model<TransferModel>;

    beforeEach(async () => {
        const uri = await new MongoMemoryServer().getUri();
        connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true} as ConnectOptions,  err => {
            if (!err) return;
            
            console.log(err);
            process.exit(1);
        });

        transferModel = model<TransferModel>(transferCollection, TransferSchema, transferCollection);
    });

    afterEach(() => connection.close());

    test('should insert transfer data on database', async () => {
        const today = convertDateToReadable(new Date().toDateString());

        const fakeResultTransfer: TransferDto = {
            fromId: 'fakeAccountFrom',
            toId: 'fakeAccountTo',
            value: 15.00,
            expectedOn: today
        };

        const validTransfer = new transferModel(fakeResultTransfer);
        const savedTransfer = await validTransfer.save();

        expect(savedTransfer.id).toBeDefined();
        expect(savedTransfer.fromId).toBe(fakeResultTransfer.fromId);
        expect(savedTransfer.toId).toBe(fakeResultTransfer.toId);
        expect(savedTransfer.value).toBe(15.000);
        expect(savedTransfer.expectedOn).toBe(today);
    })
})