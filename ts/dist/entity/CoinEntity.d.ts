import { CoinpaprikaEntityBase } from '../CoinpaprikaEntityBase';
import type { CoinpaprikaSDK } from '../CoinpaprikaSDK';
import type { Control } from '../types';
import type { Coin, CoinListMatch } from '../CoinpaprikaTypes';
declare class CoinEntity extends CoinpaprikaEntityBase<Coin> {
    constructor(client: CoinpaprikaSDK, entopts: any);
    make(this: CoinEntity): CoinEntity;
    list(this: any, reqmatch?: CoinListMatch, ctrl?: Control): Promise<CoinEntity[]>;
}
export { CoinEntity };
