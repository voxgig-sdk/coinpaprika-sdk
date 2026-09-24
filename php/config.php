<?php
declare(strict_types=1);

// Coinpaprika SDK configuration

class CoinpaprikaConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Coinpaprika",
                "slug" => "coinpaprika",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.coinpaprika.com/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "coin" => [],
                    "ticker" => [],
                ],
            ],
            "entity" => [
        'coin' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the coin',
            ],
            [
              'name' => 'is_active',
              'title' => 'Is Active',
              'type' => '`$BOOLEAN`',
              'short' => 'Indicates if the coin is active',
            ],
            [
              'name' => 'is_new',
              'title' => 'Is New',
              'type' => '`$BOOLEAN`',
              'short' => 'Indicates if the coin is new',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'Name of the cryptocurrency',
            ],
            [
              'name' => 'rank',
              'title' => 'Rank',
              'type' => '`$INTEGER`',
              'short' => 'Market cap rank',
            ],
            [
              'name' => 'symbol',
              'title' => 'Symbol',
              'type' => '`$STRING`',
              'short' => 'Ticker symbol of the cryptocurrency',
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$STRING`',
              'short' => 'Type of cryptocurrency (coin or token)',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'coin',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/coins',
                  'segments' => [
                    [
                      'lit' => 'coins',
                    ],
                  ],
                  'parts' => [
                    'coins',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ticker' => [
          'fields' => [
            [
              'name' => 'beta_value',
              'title' => 'Beta Value',
              'type' => '`$NUMBER`',
              'short' => 'Beta value for the coin',
            ],
            [
              'name' => 'circulating_supply',
              'title' => 'Circulating Supply',
              'type' => '`$NUMBER`',
              'short' => 'Circulating supply of the coin',
            ],
            [
              'name' => 'first_data_at',
              'title' => 'First Data At',
              'type' => '`$STRING`',
              'short' => 'Date of first data availability',
              'format' => 'date-time',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the coin',
            ],
            [
              'name' => 'last_updated',
              'title' => 'Last Updated',
              'type' => '`$STRING`',
              'short' => 'Last update timestamp',
              'format' => 'date-time',
            ],
            [
              'name' => 'max_supply',
              'title' => 'Max Supply',
              'type' => '`$NUMBER`',
              'short' => 'Maximum supply of the coin',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'Name of the cryptocurrency',
            ],
            [
              'name' => 'quotes',
              'title' => 'Quotes',
              'type' => '`$OBJECT`',
              'short' => 'Price and market data in different quote currencies',
            ],
            [
              'name' => 'rank',
              'title' => 'Rank',
              'type' => '`$INTEGER`',
              'short' => 'Market cap rank',
            ],
            [
              'name' => 'symbol',
              'title' => 'Symbol',
              'type' => '`$STRING`',
              'short' => 'Ticker symbol of the cryptocurrency',
            ],
            [
              'name' => 'total_supply',
              'title' => 'Total Supply',
              'type' => '`$NUMBER`',
              'short' => 'Total supply of the coin',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'ticker',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tickers',
                  'segments' => [
                    [
                      'lit' => 'tickers',
                    ],
                  ],
                  'parts' => [
                    'tickers',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'quote',
                        'orig' => 'quote',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'USD',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'quote',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CoinpaprikaFeatures::make_feature($name);
    }
}
