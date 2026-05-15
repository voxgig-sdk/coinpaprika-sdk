package voxgigcoinpaprikasdk

import (
	"github.com/voxgig-sdk/coinpaprika-sdk/core"
	"github.com/voxgig-sdk/coinpaprika-sdk/entity"
	"github.com/voxgig-sdk/coinpaprika-sdk/feature"
	_ "github.com/voxgig-sdk/coinpaprika-sdk/utility"
)

// Type aliases preserve external API.
type CoinpaprikaSDK = core.CoinpaprikaSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CoinpaprikaEntity = core.CoinpaprikaEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CoinpaprikaError = core.CoinpaprikaError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCoinEntityFunc = func(client *core.CoinpaprikaSDK, entopts map[string]any) core.CoinpaprikaEntity {
		return entity.NewCoinEntity(client, entopts)
	}
	core.NewTickerEntityFunc = func(client *core.CoinpaprikaSDK, entopts map[string]any) core.CoinpaprikaEntity {
		return entity.NewTickerEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCoinpaprikaSDK = core.NewCoinpaprikaSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
