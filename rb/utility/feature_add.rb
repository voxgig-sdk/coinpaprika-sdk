# Coinpaprika SDK utility: feature_add
module CoinpaprikaUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
