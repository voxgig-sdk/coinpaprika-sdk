<?php
declare(strict_types=1);

// Coinpaprika SDK utility: prepare_headers

class CoinpaprikaPrepareHeaders
{
    public static function call(CoinpaprikaContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
