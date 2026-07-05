# Coinpaprika TypeScript SDK Reference

Complete API reference for the Coinpaprika TypeScript SDK.


## CoinpaprikaSDK

### Constructor

```ts
new CoinpaprikaSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CoinpaprikaSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CoinpaprikaSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CoinpaprikaSDK` instance in test mode.


### Instance Methods

#### `Coin(data?: object)`

Create a new `Coin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CoinEntity` instance.

#### `Ticker(data?: object)`

Create a new `Ticker` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TickerEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CoinpaprikaSDK.test()`.

**Returns:** `CoinpaprikaSDK` instance in test mode.


---

## CoinEntity

```ts
const coin = client.Coin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `is_active` | `boolean` | No |  |
| `is_new` | `boolean` | No |  |
| `name` | `string` | No |  |
| `rank` | `number` | No |  |
| `symbol` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Coin().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CoinEntity` instance with the same client and
options.

#### `client()`

Return the parent `CoinpaprikaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TickerEntity

```ts
const ticker = client.Ticker()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `beta_value` | `number` | No |  |
| `circulating_supply` | `number` | No |  |
| `first_data_at` | `string` | No |  |
| `id` | `string` | No |  |
| `last_updated` | `string` | No |  |
| `max_supply` | `number` | No |  |
| `name` | `string` | No |  |
| `quote` | `Record<string, any>` | No |  |
| `rank` | `number` | No |  |
| `symbol` | `string` | No |  |
| `total_supply` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Ticker().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TickerEntity` instance with the same client and
options.

#### `client()`

Return the parent `CoinpaprikaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CoinpaprikaSDK({
  feature: {
    test: { active: true },
  }
})
```

