# Coinpaprika SDK utility: make_context
require_relative '../core/context'
module CoinpaprikaUtilities
  MakeContext = ->(ctxmap, basectx) {
    CoinpaprikaContext.new(ctxmap, basectx)
  }
end
