<?php
declare(strict_types=1);

// Coinpaprika SDK utility: prepare_body

class CoinpaprikaPrepareBody
{
    public static function call(CoinpaprikaContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
