import { CoinpaprikaEntityBase } from '../CoinpaprikaEntityBase';
import type { CoinpaprikaSDK } from '../CoinpaprikaSDK';
import type { Control } from '../types';
import type { Ticker, TickerListMatch } from '../CoinpaprikaTypes';
declare class TickerEntity extends CoinpaprikaEntityBase<Ticker> {
    constructor(client: CoinpaprikaSDK, entopts: any);
    make(this: TickerEntity): TickerEntity;
    list(this: any, reqmatch?: TickerListMatch, ctrl?: Control): Promise<TickerEntity[]>;
}
export { TickerEntity };
