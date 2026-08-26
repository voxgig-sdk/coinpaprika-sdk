package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Coinpaprika",
			"slug": "coinpaprika",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.coinpaprika.com/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"coin": map[string]any{},
				"ticker": map[string]any{},
			},
		},
		"entity": map[string]any{
			"coin": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the coin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is_active",
						"short": "Indicates if the coin is active",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_new",
						"short": "Indicates if the coin is new",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the cryptocurrency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
						"short": "Market cap rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "symbol",
						"short": "Ticker symbol of the cryptocurrency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of cryptocurrency (coin or token)",
						"type": "`$STRING`",
					},
				},
				"name": "coin",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/coins",
								"parts": []any{
									"coins",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ticker": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "beta_value",
						"short": "Beta value for the coin",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "circulating_supply",
						"short": "Circulating supply of the coin",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "first_data_at",
						"short": "Date of first data availability",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the coin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_updated",
						"short": "Last update timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "max_supply",
						"short": "Maximum supply of the coin",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the cryptocurrency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "quotes",
						"short": "Price and market data in different quote currencies",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "rank",
						"short": "Market cap rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "symbol",
						"short": "Ticker symbol of the cryptocurrency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_supply",
						"short": "Total supply of the coin",
						"type": "`$NUMBER`",
					},
				},
				"name": "ticker",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "USD",
											"kind": "query",
											"name": "quote",
											"orig": "quote",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/tickers",
								"parts": []any{
									"tickers",
								},
								"select": map[string]any{
									"exist": []any{
										"quote",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
