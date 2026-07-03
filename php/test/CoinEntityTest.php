<?php
declare(strict_types=1);

// Coin entity test

require_once __DIR__ . '/../coinpaprika_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CoinEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CoinpaprikaSDK::test(null, null);
        $ent = $testsdk->Coin(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = coin_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "coin." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set COINPAPRIKA_TEST_COIN_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $coin_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.coin")));
        $coin_ref01_data = null;
        if (count($coin_ref01_data_raw) > 0) {
            $coin_ref01_data = Helpers::to_map($coin_ref01_data_raw[0][1]);
        }

        // LIST
        $coin_ref01_ent = $client->Coin(null);
        $coin_ref01_match = [];

        [$coin_ref01_list_result, $err] = $coin_ref01_ent->list($coin_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($coin_ref01_list_result);

    }
}

function coin_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/coin/CoinTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CoinpaprikaSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["coin01", "coin02", "coin03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("COINPAPRIKA_TEST_COIN_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COINPAPRIKA_TEST_COIN_ENTID" => $idmap,
        "COINPAPRIKA_TEST_LIVE" => "FALSE",
        "COINPAPRIKA_TEST_EXPLAIN" => "FALSE",
        "COINPAPRIKA_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COINPAPRIKA_TEST_COIN_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["COINPAPRIKA_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["COINPAPRIKA_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new CoinpaprikaSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["COINPAPRIKA_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["COINPAPRIKA_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
