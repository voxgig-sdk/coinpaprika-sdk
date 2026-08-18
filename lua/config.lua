-- Coinpaprika SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Coinpaprika",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.coinpaprika.com/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["coin"] = {},
        ["ticker"] = {},
      },
    },
    entity = {
      ["coin"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "is_active",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "is_new",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "rank",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "symbol",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "coin",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/coins",
                ["parts"] = {
                  "coins",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["ticker"] = {
        ["fields"] = {
          {
            ["name"] = "beta_value",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "circulating_supply",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "first_data_at",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "last_updated",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "max_supply",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "quotes",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "rank",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "symbol",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "total_supply",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "ticker",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "USD",
                      ["kind"] = "query",
                      ["name"] = "quote",
                      ["orig"] = "quote",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/tickers",
                ["parts"] = {
                  "tickers",
                },
                ["select"] = {
                  ["exist"] = {
                    "quote",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
