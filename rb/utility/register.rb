# Coinpaprika SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CoinpaprikaUtility.registrar = ->(u) {
  u.clean = CoinpaprikaUtilities::Clean
  u.done = CoinpaprikaUtilities::Done
  u.make_error = CoinpaprikaUtilities::MakeError
  u.feature_add = CoinpaprikaUtilities::FeatureAdd
  u.feature_hook = CoinpaprikaUtilities::FeatureHook
  u.feature_init = CoinpaprikaUtilities::FeatureInit
  u.fetcher = CoinpaprikaUtilities::Fetcher
  u.make_fetch_def = CoinpaprikaUtilities::MakeFetchDef
  u.make_context = CoinpaprikaUtilities::MakeContext
  u.make_options = CoinpaprikaUtilities::MakeOptions
  u.make_request = CoinpaprikaUtilities::MakeRequest
  u.make_response = CoinpaprikaUtilities::MakeResponse
  u.make_result = CoinpaprikaUtilities::MakeResult
  u.make_point = CoinpaprikaUtilities::MakePoint
  u.make_spec = CoinpaprikaUtilities::MakeSpec
  u.make_url = CoinpaprikaUtilities::MakeUrl
  u.param = CoinpaprikaUtilities::Param
  u.prepare_auth = CoinpaprikaUtilities::PrepareAuth
  u.prepare_body = CoinpaprikaUtilities::PrepareBody
  u.prepare_headers = CoinpaprikaUtilities::PrepareHeaders
  u.prepare_method = CoinpaprikaUtilities::PrepareMethod
  u.prepare_params = CoinpaprikaUtilities::PrepareParams
  u.prepare_path = CoinpaprikaUtilities::PreparePath
  u.prepare_query = CoinpaprikaUtilities::PrepareQuery
  u.result_basic = CoinpaprikaUtilities::ResultBasic
  u.result_body = CoinpaprikaUtilities::ResultBody
  u.result_headers = CoinpaprikaUtilities::ResultHeaders
  u.transform_request = CoinpaprikaUtilities::TransformRequest
  u.transform_response = CoinpaprikaUtilities::TransformResponse
}
