# Coinpaprika SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CoinpaprikaFeatures
  def self.make_feature(name)
    case name
    when "base"
      CoinpaprikaBaseFeature.new
    when "ratelimit"
      CoinpaprikaRatelimitFeature.new
    when "retry"
      CoinpaprikaRetryFeature.new
    when "test"
      CoinpaprikaTestFeature.new
    when "timeout"
      CoinpaprikaTimeoutFeature.new
    else
      CoinpaprikaBaseFeature.new
    end
  end
end
