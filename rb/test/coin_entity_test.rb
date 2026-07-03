# Coin entity test

require "minitest/autorun"
require "json"
require_relative "../Coinpaprika_sdk"
require_relative "runner"

class CoinEntityTest < Minitest::Test
  def test_create_instance
    testsdk = CoinpaprikaSDK.test(nil, nil)
    ent = testsdk.Coin(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = coin_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "coin." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set COINPAPRIKA_TEST_COIN_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    coin_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.coin")))
    coin_ref01_data = nil
    if coin_ref01_data_raw.length > 0
      coin_ref01_data = Helpers.to_map(coin_ref01_data_raw[0][1])
    end

    # LIST
    coin_ref01_ent = client.Coin(nil)
    coin_ref01_match = {}

    coin_ref01_list_result, err = coin_ref01_ent.list(coin_ref01_match, nil)
    assert_nil err
    assert coin_ref01_list_result.is_a?(Array)

  end
end

def coin_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "coin", "CoinTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CoinpaprikaSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["coin01", "coin02", "coin03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["COINPAPRIKA_TEST_COIN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COINPAPRIKA_TEST_COIN_ENTID" => idmap,
    "COINPAPRIKA_TEST_LIVE" => "FALSE",
    "COINPAPRIKA_TEST_EXPLAIN" => "FALSE",
    "COINPAPRIKA_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["COINPAPRIKA_TEST_COIN_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["COINPAPRIKA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["COINPAPRIKA_APIKEY"],
      },
      extra || {},
    ])
    client = CoinpaprikaSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["COINPAPRIKA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["COINPAPRIKA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
