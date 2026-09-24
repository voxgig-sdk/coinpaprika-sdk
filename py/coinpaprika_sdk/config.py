# Coinpaprika SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Coinpaprika",
            "slug": "coinpaprika",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.coinpaprika.com/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "coin": {},
                "ticker": {},
            },
        },
        "entity": {
      "coin": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the coin",
          },
          {
            "name": "is_active",
            "title": "Is Active",
            "type": "`$BOOLEAN`",
            "short": "Indicates if the coin is active",
          },
          {
            "name": "is_new",
            "title": "Is New",
            "type": "`$BOOLEAN`",
            "short": "Indicates if the coin is new",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the cryptocurrency",
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$INTEGER`",
            "short": "Market cap rank",
          },
          {
            "name": "symbol",
            "title": "Symbol",
            "type": "`$STRING`",
            "short": "Ticker symbol of the cryptocurrency",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Type of cryptocurrency (coin or token)",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "coin",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/coins",
                "segments": [
                  {
                    "lit": "coins",
                  },
                ],
                "parts": [
                  "coins",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ticker": {
        "fields": [
          {
            "name": "beta_value",
            "title": "Beta Value",
            "type": "`$NUMBER`",
            "short": "Beta value for the coin",
          },
          {
            "name": "circulating_supply",
            "title": "Circulating Supply",
            "type": "`$NUMBER`",
            "short": "Circulating supply of the coin",
          },
          {
            "name": "first_data_at",
            "title": "First Data At",
            "type": "`$STRING`",
            "short": "Date of first data availability",
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the coin",
          },
          {
            "name": "last_updated",
            "title": "Last Updated",
            "type": "`$STRING`",
            "short": "Last update timestamp",
            "format": "date-time",
          },
          {
            "name": "max_supply",
            "title": "Max Supply",
            "type": "`$NUMBER`",
            "short": "Maximum supply of the coin",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the cryptocurrency",
          },
          {
            "name": "quotes",
            "title": "Quotes",
            "type": "`$OBJECT`",
            "short": "Price and market data in different quote currencies",
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$INTEGER`",
            "short": "Market cap rank",
          },
          {
            "name": "symbol",
            "title": "Symbol",
            "type": "`$STRING`",
            "short": "Ticker symbol of the cryptocurrency",
          },
          {
            "name": "total_supply",
            "title": "Total Supply",
            "type": "`$NUMBER`",
            "short": "Total supply of the coin",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "ticker",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/tickers",
                "segments": [
                  {
                    "lit": "tickers",
                  },
                ],
                "parts": [
                  "tickers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "quote",
                      "orig": "quote",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "USD",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "quote",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
