package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/coinpaprika-sdk"
	"github.com/voxgig-sdk/coinpaprika-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestCoinEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Coin(nil)
		if ent == nil {
			t.Fatal("expected non-nil CoinEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := coinBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "coin." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set COINPAPRIKA_TEST_COIN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		coinRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.coin", setup.data)))
		var coinRef01Data map[string]any
		if len(coinRef01DataRaw) > 0 {
			coinRef01Data = core.ToMapAny(coinRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = coinRef01Data

		// LIST
		coinRef01Ent := client.Coin(nil)
		coinRef01Match := map[string]any{}

		coinRef01ListResult, err := coinRef01Ent.List(coinRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, coinRef01ListOk := coinRef01ListResult.([]any)
		if !coinRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", coinRef01ListResult)
		}

	})
}

func coinBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "coin", "CoinTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read coin test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse coin test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"coin01", "coin02", "coin03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("COINPAPRIKA_TEST_COIN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COINPAPRIKA_TEST_COIN_ENTID": idmap,
		"COINPAPRIKA_TEST_LIVE":      "FALSE",
		"COINPAPRIKA_TEST_EXPLAIN":   "FALSE",
		"COINPAPRIKA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["COINPAPRIKA_TEST_COIN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["COINPAPRIKA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["COINPAPRIKA_APIKEY"],
			},
			extra,
		})
		client = sdk.NewCoinpaprikaSDK(core.ToMapAny(mergedOpts))
	}

	live := env["COINPAPRIKA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["COINPAPRIKA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
