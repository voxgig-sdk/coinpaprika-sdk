
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Coinpaprika',
        slug: "coinpaprika",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.coinpaprika.com/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      coin: {
      },

      ticker: {
      },

    }
  }


  entity = {
    "coin": {
      "fields": [
        {
          "name": "id",
          "short": "Unique identifier for the coin",
          "type": "`$STRING`"
        },
        {
          "name": "is_active",
          "short": "Indicates if the coin is active",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_new",
          "short": "Indicates if the coin is new",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "name",
          "short": "Name of the cryptocurrency",
          "type": "`$STRING`"
        },
        {
          "name": "rank",
          "short": "Market cap rank",
          "type": "`$INTEGER`"
        },
        {
          "name": "symbol",
          "short": "Ticker symbol of the cryptocurrency",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "short": "Type of cryptocurrency (coin or token)",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
              "segments": [
                {
                  "lit": "coins"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "coins"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ticker": {
      "fields": [
        {
          "name": "beta_value",
          "short": "Beta value for the coin",
          "type": "`$NUMBER`"
        },
        {
          "name": "circulating_supply",
          "short": "Circulating supply of the coin",
          "type": "`$NUMBER`"
        },
        {
          "format": "date-time",
          "name": "first_data_at",
          "short": "Date of first data availability",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the coin",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "last_updated",
          "short": "Last update timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "max_supply",
          "short": "Maximum supply of the coin",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "short": "Name of the cryptocurrency",
          "type": "`$STRING`"
        },
        {
          "name": "quotes",
          "short": "Price and market data in different quote currencies",
          "type": "`$OBJECT`"
        },
        {
          "name": "rank",
          "short": "Market cap rank",
          "type": "`$INTEGER`"
        },
        {
          "name": "symbol",
          "short": "Ticker symbol of the cryptocurrency",
          "type": "`$STRING`"
        },
        {
          "name": "total_supply",
          "short": "Total supply of the coin",
          "type": "`$NUMBER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/tickers",
              "segments": [
                {
                  "lit": "tickers"
                }
              ],
              "select": {
                "exist": [
                  "quote"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "tickers"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

