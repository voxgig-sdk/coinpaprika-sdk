# Coinpaprika SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Unique identifier for the coin",
            "type": "`$STRING`",
          },
          {
            "name": "is_active",
            "short": "Indicates if the coin is active",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_new",
            "short": "Indicates if the coin is new",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "name",
            "short": "Name of the cryptocurrency",
            "type": "`$STRING`",
          },
          {
            "name": "rank",
            "short": "Market cap rank",
            "type": "`$INTEGER`",
          },
          {
            "name": "symbol",
            "short": "Ticker symbol of the cryptocurrency",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Type of cryptocurrency (coin or token)",
            "type": "`$STRING`",
          },
        ],
        "name": "coin",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/coins",
                "parts": [
                  "coins",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "short": "Beta value for the coin",
            "type": "`$NUMBER`",
          },
          {
            "name": "circulating_supply",
            "short": "Circulating supply of the coin",
            "type": "`$NUMBER`",
          },
          {
            "name": "first_data_at",
            "short": "Date of first data availability",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the coin",
            "type": "`$STRING`",
          },
          {
            "name": "last_updated",
            "short": "Last update timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "max_supply",
            "short": "Maximum supply of the coin",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "short": "Name of the cryptocurrency",
            "type": "`$STRING`",
          },
          {
            "name": "quotes",
            "short": "Price and market data in different quote currencies",
            "type": "`$OBJECT`",
          },
          {
            "name": "rank",
            "short": "Market cap rank",
            "type": "`$INTEGER`",
          },
          {
            "name": "symbol",
            "short": "Ticker symbol of the cryptocurrency",
            "type": "`$STRING`",
          },
          {
            "name": "total_supply",
            "short": "Total supply of the coin",
            "type": "`$NUMBER`",
          },
        ],
        "name": "ticker",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "USD",
                      "kind": "query",
                      "name": "quote",
                      "orig": "quote",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/tickers",
                "parts": [
                  "tickers",
                ],
                "select": {
                  "exist": [
                    "quote",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
