<?php
declare(strict_types=1);

// Coinpaprika SDK utility: result_headers

class CoinpaprikaResultHeaders
{
    public static function call(CoinpaprikaContext $ctx): ?CoinpaprikaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
