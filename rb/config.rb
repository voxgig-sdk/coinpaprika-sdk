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
        "slug" => "coinpaprika",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "short" => "Unique identifier for the coin",
              "type" => "`$STRING`",
            },
            {
              "name" => "is_active",
              "short" => "Indicates if the coin is active",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_new",
              "short" => "Indicates if the coin is new",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "name",
              "short" => "Name of the cryptocurrency",
              "type" => "`$STRING`",
            },
            {
              "name" => "rank",
              "short" => "Market cap rank",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "symbol",
              "short" => "Ticker symbol of the cryptocurrency",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "short" => "Type of cryptocurrency (coin or token)",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
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
                  "segments" => [
                    {
                      "lit" => "coins",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "coins",
                  ],
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
              "short" => "Beta value for the coin",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "circulating_supply",
              "short" => "Circulating supply of the coin",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "date-time",
              "name" => "first_data_at",
              "short" => "Date of first data availability",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the coin",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "last_updated",
              "short" => "Last update timestamp",
              "type" => "`$STRING`",
            },
            {
              "name" => "max_supply",
              "short" => "Maximum supply of the coin",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "short" => "Name of the cryptocurrency",
              "type" => "`$STRING`",
            },
            {
              "name" => "quotes",
              "short" => "Price and market data in different quote currencies",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "rank",
              "short" => "Market cap rank",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "symbol",
              "short" => "Ticker symbol of the cryptocurrency",
              "type" => "`$STRING`",
            },
            {
              "name" => "total_supply",
              "short" => "Total supply of the coin",
              "type" => "`$NUMBER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
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
                  "segments" => [
                    {
                      "lit" => "tickers",
                    },
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
                  "parts" => [
                    "tickers",
                  ],
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
