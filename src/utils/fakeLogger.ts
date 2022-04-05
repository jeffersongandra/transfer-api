import { Logger } from "@nestjs/common";

class FakeLogger extends Logger{
    public log = (obj: any) => this._validateContext();
    public error = (obj: any) => this._validateContext();
    public verbose = (message: any, context?: string) => this._validateContext();
    public debug = (message: any, context?: string) => this._validateContext();

    private _validateContext = () => {}
}

export const fakeLogger = new FakeLogger() as Logger
