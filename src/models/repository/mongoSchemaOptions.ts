import { SchemaOptions } from "mongoose";

function transform(doc: any, ret: any, options: any): any {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
}

export const schemaOptions: SchemaOptions = {
    toJSON: { transform },
    toObject: { transform }
};


export const optionsUpdateById = { useFindAndModify: false };