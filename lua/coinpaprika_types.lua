-- Typed models for the Coinpaprika SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Coin
---@field id? string
---@field is_active? boolean
---@field is_new? boolean
---@field name? string
---@field rank? number
---@field symbol? string
---@field type? string

---@class CoinListMatch

---@class Ticker
---@field beta_value? number
---@field circulating_supply? number
---@field first_data_at? string
---@field id? string
---@field last_updated? string
---@field max_supply? number
---@field name? string
---@field quote? table
---@field rank? number
---@field symbol? string
---@field total_supply? number

---@class TickerListMatch

local M = {}

return M
