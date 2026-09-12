import { Context } from './Context';
declare class CoinpaprikaError extends Error {
    isCoinpaprikaError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CoinpaprikaError };
