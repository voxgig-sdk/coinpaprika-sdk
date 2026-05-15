# Coinpaprika SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CoinpaprikaFeatures
  def self.make_feature(name)
    case name
    when "base"
      CoinpaprikaBaseFeature.new
    when "test"
      CoinpaprikaTestFeature.new
    else
      CoinpaprikaBaseFeature.new
    end
  end
end
