<?php
declare(strict_types=1);

// Typed models for the Coinpaprika SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Coin entity data model. */
class Coin
{
    public ?string $id = null;
    public ?bool $is_active = null;
    public ?bool $is_new = null;
    public ?string $name = null;
    public ?int $rank = null;
    public ?string $symbol = null;
    public ?string $type = null;
}

/** Request payload for Coin#list. */
class CoinListMatch
{
    public ?string $id = null;
    public ?bool $is_active = null;
    public ?bool $is_new = null;
    public ?string $name = null;
    public ?int $rank = null;
    public ?string $symbol = null;
    public ?string $type = null;
}

/** Ticker entity data model. */
class Ticker
{
    public ?float $beta_value = null;
    public ?float $circulating_supply = null;
    public ?string $first_data_at = null;
    public ?string $id = null;
    public ?string $last_updated = null;
    public ?float $max_supply = null;
    public ?string $name = null;
    public ?array $quote = null;
    public ?int $rank = null;
    public ?string $symbol = null;
    public ?float $total_supply = null;
}

/** Request payload for Ticker#list. */
class TickerListMatch
{
    public ?float $beta_value = null;
    public ?float $circulating_supply = null;
    public ?string $first_data_at = null;
    public ?string $id = null;
    public ?string $last_updated = null;
    public ?float $max_supply = null;
    public ?string $name = null;
    public ?array $quote = null;
    public ?int $rank = null;
    public ?string $symbol = null;
    public ?float $total_supply = null;
}

