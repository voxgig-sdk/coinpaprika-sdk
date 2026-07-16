
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api.coinpaprika.com/v1',

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
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "is_active",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 1
        },
        {
          "active": true,
          "name": "is_new",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "rank",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "symbol",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        }
      ],
      "name": "coin",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/coins",
              "parts": [
                "coins"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ticker": {
      "fields": [
        {
          "active": true,
          "name": "beta_value",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "circulating_supply",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "first_data_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "last_updated",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "max_supply",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "quote",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 7
        },
        {
          "active": true,
          "name": "rank",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 8
        },
        {
          "active": true,
          "name": "symbol",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "total_supply",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 10
        }
      ],
      "name": "ticker",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": "USD",
                    "kind": "query",
                    "name": "quote",
                    "orig": "quote",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/tickers",
              "parts": [
                "tickers"
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
              "index$": 0
            }
          ],
          "key$": "list"
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
  config
}

