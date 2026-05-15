package = "voxgig-sdk-coinpaprika"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/coinpaprika-sdk.git"
}
description = {
  summary = "Coinpaprika SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["coinpaprika_sdk"] = "coinpaprika_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
