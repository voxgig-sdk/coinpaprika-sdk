<?php
declare(strict_types=1);

// Coinpaprika SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CoinpaprikaFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CoinpaprikaBaseFeature();
            case "test":
                return new CoinpaprikaTestFeature();
            default:
                return new CoinpaprikaBaseFeature();
        }
    }
}
