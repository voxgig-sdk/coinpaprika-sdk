// Typed models for the Coinpaprika SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Coin is the typed data model for the coin entity.
type Coin struct {
	Id *string `json:"id,omitempty"`
	IsActive *bool `json:"is_active,omitempty"`
	IsNew *bool `json:"is_new,omitempty"`
	Name *string `json:"name,omitempty"`
	Rank *int `json:"rank,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
	Type *string `json:"type,omitempty"`
}

// CoinListMatch mirrors the coin fields as an all-optional match
// filter (Go analog of Partial<Coin>).
type CoinListMatch struct {
	Id *string `json:"id,omitempty"`
	IsActive *bool `json:"is_active,omitempty"`
	IsNew *bool `json:"is_new,omitempty"`
	Name *string `json:"name,omitempty"`
	Rank *int `json:"rank,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Ticker is the typed data model for the ticker entity.
type Ticker struct {
	BetaValue *float64 `json:"beta_value,omitempty"`
	CirculatingSupply *float64 `json:"circulating_supply,omitempty"`
	FirstDataAt *string `json:"first_data_at,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	MaxSupply *float64 `json:"max_supply,omitempty"`
	Name *string `json:"name,omitempty"`
	Quote *map[string]any `json:"quote,omitempty"`
	Rank *int `json:"rank,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
	TotalSupply *float64 `json:"total_supply,omitempty"`
}

// TickerListMatch mirrors the ticker fields as an all-optional match
// filter (Go analog of Partial<Ticker>).
type TickerListMatch struct {
	BetaValue *float64 `json:"beta_value,omitempty"`
	CirculatingSupply *float64 `json:"circulating_supply,omitempty"`
	FirstDataAt *string `json:"first_data_at,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	MaxSupply *float64 `json:"max_supply,omitempty"`
	Name *string `json:"name,omitempty"`
	Quote *map[string]any `json:"quote,omitempty"`
	Rank *int `json:"rank,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
	TotalSupply *float64 `json:"total_supply,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
