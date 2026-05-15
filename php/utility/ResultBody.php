<?php
declare(strict_types=1);

// Coinpaprika SDK utility: result_body

class CoinpaprikaResultBody
{
    public static function call(CoinpaprikaContext $ctx): ?CoinpaprikaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
