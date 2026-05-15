package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCoinEntityFunc func(client *CoinpaprikaSDK, entopts map[string]any) CoinpaprikaEntity

var NewTickerEntityFunc func(client *CoinpaprikaSDK, entopts map[string]any) CoinpaprikaEntity

