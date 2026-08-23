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
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'short' => 'Unique identifier for the coin',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'is_active',
              'short' => 'Indicates if the coin is active',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'is_new',
              'short' => 'Indicates if the coin is new',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the cryptocurrency',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rank',
              'short' => 'Market cap rank',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'symbol',
              'short' => 'Ticker symbol of the cryptocurrency',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Type of cryptocurrency (coin or token)',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'coin',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/coins',
                  'parts' => [
                    'coins',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
              'short' => 'Beta value for the coin',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'circulating_supply',
              'short' => 'Circulating supply of the coin',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'first_data_at',
              'short' => 'Date of first data availability',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the coin',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'last_updated',
              'short' => 'Last update timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'max_supply',
              'short' => 'Maximum supply of the coin',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the cryptocurrency',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'quotes',
              'short' => 'Price and market data in different quote currencies',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'rank',
              'short' => 'Market cap rank',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'symbol',
              'short' => 'Ticker symbol of the cryptocurrency',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total_supply',
              'short' => 'Total supply of the coin',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'ticker',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'USD',
                        'kind' => 'query',
                        'name' => 'quote',
                        'orig' => 'quote',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tickers',
                  'parts' => [
                    'tickers',
                  ],
                  'select' => [
                    'exist' => [
                      'quote',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
