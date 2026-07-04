# Typed models for the Coinpaprika SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Coin:
    id: Optional[str] = None
    is_active: Optional[bool] = None
    is_new: Optional[bool] = None
    name: Optional[str] = None
    rank: Optional[int] = None
    symbol: Optional[str] = None
    type: Optional[str] = None


@dataclass
class CoinListMatch:
    id: Optional[str] = None
    is_active: Optional[bool] = None
    is_new: Optional[bool] = None
    name: Optional[str] = None
    rank: Optional[int] = None
    symbol: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Ticker:
    beta_value: Optional[float] = None
    circulating_supply: Optional[float] = None
    first_data_at: Optional[str] = None
    id: Optional[str] = None
    last_updated: Optional[str] = None
    max_supply: Optional[float] = None
    name: Optional[str] = None
    quote: Optional[dict] = None
    rank: Optional[int] = None
    symbol: Optional[str] = None
    total_supply: Optional[float] = None


@dataclass
class TickerListMatch:
    beta_value: Optional[float] = None
    circulating_supply: Optional[float] = None
    first_data_at: Optional[str] = None
    id: Optional[str] = None
    last_updated: Optional[str] = None
    max_supply: Optional[float] = None
    name: Optional[str] = None
    quote: Optional[dict] = None
    rank: Optional[int] = None
    symbol: Optional[str] = None
    total_supply: Optional[float] = None

