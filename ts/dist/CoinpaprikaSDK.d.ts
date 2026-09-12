import { CoinEntity } from './entity/CoinEntity';
import { TickerEntity } from './entity/TickerEntity';
export type * from './CoinpaprikaTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CoinpaprikaEntityBase } from './CoinpaprikaEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CoinpaprikaSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Coin(entopts?: Record<string, any>): CoinEntity;
    Ticker(entopts?: Record<string, any>): TickerEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CoinpaprikaSDK;
    tester(testopts?: any, sdkopts?: any): CoinpaprikaSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CoinpaprikaSDK;
export { stdutil, config, BaseFeature, CoinpaprikaEntityBase, CoinpaprikaSDK, SDK, };
