# Coinpaprika SDK configuration

module CoinpaprikaConfig
  def self.make_config
    {
      "main" => {
        "name" => "Coinpaprika",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.coinpaprika.com/v1",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "coin" => {},
          "ticker" => {},
        },
      },
      "entity" => {
        "coin" => {
          "fields" => [
            {
              "name" => "id",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "is_active",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "is_new",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "rank",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "symbol",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "type",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
          ],
          "name" => "coin",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/coins",
                  "parts" => [
                    "coins",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "ticker" => {
          "fields" => [
            {
              "name" => "beta_value",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "circulating_supply",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "first_data_at",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "id",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "last_updated",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "max_supply",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "quote",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "rank",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "symbol",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "total_supply",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 10,
            },
          ],
          "name" => "ticker",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "USD",
                        "kind" => "query",
                        "name" => "quote",
                        "orig" => "quote",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/tickers",
                  "parts" => [
                    "tickers",
                  ],
                  "select" => {
                    "exist" => [
                      "quote",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CoinpaprikaFeatures.make_feature(name)
  end
end
