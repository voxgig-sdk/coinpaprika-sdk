# Coinpaprika SDK

Real-time and historical cryptocurrency market data: prices, volume, market cap, and exchange listings

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Coinpaprika API

[Coinpaprika](https://coinpaprika.com/) is a cryptocurrency market data provider that exposes a public REST API at `https://api.coinpaprika.com/v1` covering prices, volumes, market capitalisation, exchanges, and historical data for thousands of crypto assets.

What you get from the API:

- Coin metadata and listings (e.g. `GET /v1/coins`, `GET /v1/coins/{coin_id}` with IDs like `btc-bitcoin`).
- Real-time tickers across all active coins or a single coin (`GET /v1/tickers`, `GET /v1/tickers/{coin_id}`).
- Historical OHLC and time-series price data.
- Exchange and market listings, including per-exchange markets.

The service is available without an API key on the free tier; professional plans are documented at [coinpaprika.com/api-plans](https://coinpaprika.com/api-plans) for higher rate limits and additional features. See [docs.coinpaprika.com](https://docs.coinpaprika.com/) for the full reference and [status.coinpaprika.com](https://status.coinpaprika.com/) for uptime.

## Try it

**TypeScript**
```bash
npm install coinpaprika
```

**Python**
```bash
pip install coinpaprika-sdk
```

**PHP**
```bash
composer require voxgig/coinpaprika-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/coinpaprika-sdk/go
```

**Ruby**
```bash
gem install coinpaprika-sdk
```

**Lua**
```bash
luarocks install coinpaprika-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CoinpaprikaSDK } from 'coinpaprika'

const client = new CoinpaprikaSDK({})

// List all coins
const coins = await client.Coin().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o coinpaprika-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "coinpaprika": {
      "command": "/abs/path/to/coinpaprika-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Coin** | A cryptocurrency tracked by Coinpaprika, identified by a slug-style id such as `btc-bitcoin`; listed and described via `GET /v1/coins` and `GET /v1/coins/{coin_id}`. | `/coins` |
| **Ticker** | Latest market data (price, volume, market cap) for a coin, retrieved via `GET /v1/tickers` for all active coins or `GET /v1/tickers/{coin_id}` for a single asset. | `/tickers` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from coinpaprika_sdk import CoinpaprikaSDK

client = CoinpaprikaSDK({})

# List all coins
coins, err = client.Coin(None).list(None, None)
```

### PHP

```php
<?php
require_once 'coinpaprika_sdk.php';

$client = new CoinpaprikaSDK([]);

// List all coins
[$coins, $err] = $client->Coin(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/coinpaprika-sdk/go"

client := sdk.NewCoinpaprikaSDK(map[string]any{})

// List all coins
coins, err := client.Coin(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Coinpaprika_sdk"

client = CoinpaprikaSDK.new({})

# List all coins
coins, err = client.Coin(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("coinpaprika_sdk")

local client = sdk.new({})

-- List all coins
local coins, err = client:Coin(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CoinpaprikaSDK.test()
const result = await client.Coin().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CoinpaprikaSDK.test(None, None)
result, err = client.Coin(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CoinpaprikaSDK::test(null, null);
[$result, $err] = $client->Coin(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Coin(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CoinpaprikaSDK.test(nil, nil)
result, err = client.Coin(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Coin(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Coinpaprika API

- Upstream: [https://coinpaprika.com/](https://coinpaprika.com/)
- API docs: [https://docs.coinpaprika.com/api-reference/rest-api/introduction](https://docs.coinpaprika.com/api-reference/rest-api/introduction)

- API client and schema usage is offered under the Apache 2.0 license.
- Cryptocurrency market data returned by the API is sourced and aggregated by Coinpaprika; check their terms before redistribution.
- A free tier is available with no credit card required; higher rate limits and advanced features are offered on paid plans.

---

Generated from the Coinpaprika API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
