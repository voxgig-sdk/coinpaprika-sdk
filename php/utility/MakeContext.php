<?php
declare(strict_types=1);

// Coinpaprika SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CoinpaprikaMakeContext
{
    public static function call(array $ctxmap, ?CoinpaprikaContext $basectx): CoinpaprikaContext
    {
        return new CoinpaprikaContext($ctxmap, $basectx);
    }
}
