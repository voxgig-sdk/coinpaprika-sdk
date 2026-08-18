# Coinpaprika SDK configuration

module CoinpaprikaConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
              "type" => "`$STRING`",
            },
            {
              "name" => "is_active",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_new",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "rank",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "symbol",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "type" => "`$STRING`",
            },
          ],
          "name" => "coin",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/coins",
                  "parts" => [
                    "coins",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
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
              "type" => "`$NUMBER`",
            },
            {
              "name" => "circulating_supply",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "first_data_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "last_updated",
              "type" => "`$STRING`",
            },
            {
              "name" => "max_supply",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "quotes",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "rank",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "symbol",
              "type" => "`$STRING`",
            },
            {
              "name" => "total_supply",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "ticker",
          "op" => {
            "list" => {
              "input" => "data",
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
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
