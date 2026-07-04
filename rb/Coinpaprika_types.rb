# frozen_string_literal: true

# Typed models for the Coinpaprika SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Coin entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_active
#   @return [Boolean, nil]
#
# @!attribute [rw] is_new
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Coin = Struct.new(
  :id,
  :is_active,
  :is_new,
  :name,
  :rank,
  :symbol,
  :type,
  keyword_init: true
)

# Match filter for Coin#list (any subset of Coin fields).
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_active
#   @return [Boolean, nil]
#
# @!attribute [rw] is_new
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
CoinListMatch = Struct.new(
  :id,
  :is_active,
  :is_new,
  :name,
  :rank,
  :symbol,
  :type,
  keyword_init: true
)

# Ticker entity data model.
#
# @!attribute [rw] beta_value
#   @return [Float, nil]
#
# @!attribute [rw] circulating_supply
#   @return [Float, nil]
#
# @!attribute [rw] first_data_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] max_supply
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [Hash, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
#
# @!attribute [rw] total_supply
#   @return [Float, nil]
Ticker = Struct.new(
  :beta_value,
  :circulating_supply,
  :first_data_at,
  :id,
  :last_updated,
  :max_supply,
  :name,
  :quote,
  :rank,
  :symbol,
  :total_supply,
  keyword_init: true
)

# Match filter for Ticker#list (any subset of Ticker fields).
#
# @!attribute [rw] beta_value
#   @return [Float, nil]
#
# @!attribute [rw] circulating_supply
#   @return [Float, nil]
#
# @!attribute [rw] first_data_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] max_supply
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [Hash, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
#
# @!attribute [rw] total_supply
#   @return [Float, nil]
TickerListMatch = Struct.new(
  :beta_value,
  :circulating_supply,
  :first_data_at,
  :id,
  :last_updated,
  :max_supply,
  :name,
  :quote,
  :rank,
  :symbol,
  :total_supply,
  keyword_init: true
)

