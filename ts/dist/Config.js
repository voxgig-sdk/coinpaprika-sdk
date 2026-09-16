"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Coinpaprika',
        slug: "coinpaprika",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.coinpaprika.com/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            coin: {},
            ticker: {},
        }
    };
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
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map