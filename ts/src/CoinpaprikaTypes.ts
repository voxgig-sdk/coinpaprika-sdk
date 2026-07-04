// Typed models for the Coinpaprika SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Coin {
  id?: string
  is_active?: boolean
  is_new?: boolean
  name?: string
  rank?: number
  symbol?: string
  type?: string
}

export type CoinListMatch = Partial<Coin>

export interface Ticker {
  beta_value?: number
  circulating_supply?: number
  first_data_at?: string
  id?: string
  last_updated?: string
  max_supply?: number
  name?: string
  quote?: Record<string, any>
  rank?: number
  symbol?: string
  total_supply?: number
}

export type TickerListMatch = Partial<Ticker>

