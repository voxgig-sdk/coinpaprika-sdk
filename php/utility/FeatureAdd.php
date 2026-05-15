<?php
declare(strict_types=1);

// Coinpaprika SDK utility: feature_add

class CoinpaprikaFeatureAdd
{
    public static function call(CoinpaprikaContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
