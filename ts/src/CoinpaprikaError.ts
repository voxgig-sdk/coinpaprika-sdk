
import { Context } from './Context'


class CoinpaprikaError extends Error {

  isCoinpaprikaError = true

  sdk = 'Coinpaprika'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CoinpaprikaError
}

