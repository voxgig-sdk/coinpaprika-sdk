

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CoinpaprikaSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('TickerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COINPAPRIKA_TEST_LIVE=TRUE.
  afterEach(liveDelay('COINPAPRIKA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CoinpaprikaSDK.test()
    const ent = testsdk.Ticker()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COINPAPRIKA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ticker.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"beta_value","req":false,"short":"Beta value for the coin","type":"`$NUMBER`","index$":0},{"active":true,"name":"circulating_supply","req":false,"short":"Circulating supply of the coin","type":"`$NUMBER`","index$":1},{"active":true,"format":"date-time","name":"first_data_at","req":false,"short":"Date of first data availability","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the coin","type":"`$STRING`","index$":3},{"active":true,"format":"date-time","name":"last_updated","req":false,"short":"Last update timestamp","type":"`$STRING`","index$":4},{"active":true,"name":"max_supply","req":false,"short":"Maximum supply of the coin","type":"`$NUMBER`","index$":5},{"active":true,"name":"name","req":false,"short":"Name of the cryptocurrency","type":"`$STRING`","index$":6},{"active":true,"name":"quotes","req":false,"short":"Price and market data in different quote currencies","type":"`$OBJECT`","index$":7},{"active":true,"name":"rank","req":false,"short":"Market cap rank","type":"`$INTEGER`","index$":8},{"active":true,"name":"symbol","req":false,"short":"Ticker symbol of the cryptocurrency","type":"`$STRING`","index$":9},{"active":true,"name":"total_supply","req":false,"short":"Total supply of the coin","type":"`$NUMBER`","index$":10}],"id":{"field":"id","name":"id"},"name":"ticker","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"USD","kind":"query","name":"quote","orig":"quote","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /tickers","json":"{\"operationId\":\"getTickers\",\"parameters\":[{\"description\":\"Comma separated list of quotes to return (e.g., USD,BTC,ETH)\",\"in\":\"query\",\"name\":\"quotes\",\"required\":false,\"schema\":{\"default\":\"USD\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"beta_value\":1,\"circulating_supply\":19000000,\"first_data_at\":\"2010-07-17T00:00:00Z\",\"id\":\"btc-bitcoin\",\"last_updated\":\"2023-10-01T12:00:00Z\",\"max_supply\":21000000,\"name\":\"Bitcoin\",\"quotes\":{\"USD\":{\"ath_date\":\"2021-11-10T00:00:00Z\",\"ath_price\":69000,\"market_cap\":950000000000,\"market_cap_change_24h\":2.3,\"percent_change_12h\":3.1,\"percent_change_15m\":0.5,\"percent_change_1h\":1.2,\"percent_change_1y\":120.5,\"percent_change_24h\":4.5,\"percent_change_30d\":15.3,\"percent_change_30m\":0.8,\"percent_change_6h\":2.5,\"percent_change_7d\":8.2,\"percent_from_price_ath\":-27.5,\"price\":50000,\"volume_24h\":30000000000,\"volume_24h_change_24h\":5.5}},\"rank\":1,\"symbol\":\"BTC\",\"total_supply\":21000000}],\"schema\":{\"items\":{\"properties\":{\"beta_value\":{\"description\":\"Beta value for the coin\",\"type\":\"number\"},\"circulating_supply\":{\"description\":\"Circulating supply of the coin\",\"type\":\"number\"},\"first_data_at\":{\"description\":\"Date of first data availability\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the coin\",\"type\":\"string\"},\"last_updated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"max_supply\":{\"description\":\"Maximum supply of the coin\",\"nullable\":true,\"type\":\"number\"},\"name\":{\"description\":\"Name of the cryptocurrency\",\"type\":\"string\"},\"quotes\":{\"additionalProperties\":{\"properties\":{\"ath_date\":{\"description\":\"Date of all-time high\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"ath_price\":{\"description\":\"All-time high price\",\"nullable\":true,\"type\":\"number\"},\"market_cap\":{\"description\":\"Market capitalization\",\"type\":\"number\"},\"market_cap_change_24h\":{\"description\":\"24-hour market cap change percentage\",\"type\":\"number\"},\"percent_change_12h\":{\"description\":\"Price change percentage in last 12 hours\",\"type\":\"number\"},\"percent_change_15m\":{\"description\":\"Price change percentage in last 15 minutes\",\"type\":\"number\"},\"percent_change_1h\":{\"description\":\"Price change percentage in last 1 hour\",\"type\":\"number\"},\"percent_change_1y\":{\"description\":\"Price change percentage in last 1 year\",\"type\":\"number\"},\"percent_change_24h\":{\"description\":\"Price change percentage in last 24 hours\",\"type\":\"number\"},\"percent_change_30d\":{\"description\":\"Price change percentage in last 30 days\",\"type\":\"number\"},\"percent_change_30m\":{\"description\":\"Price change percentage in last 30 minutes\",\"type\":\"number\"},\"percent_change_6h\":{\"description\":\"Price change percentage in last 6 hours\",\"type\":\"number\"},\"percent_change_7d\":{\"description\":\"Price change percentage in last 7 days\",\"type\":\"number\"},\"percent_from_price_ath\":{\"description\":\"Percentage from all-time high price\",\"nullable\":true,\"type\":\"number\"},\"price\":{\"description\":\"Current price\",\"type\":\"number\"},\"volume_24h\":{\"description\":\"24-hour trading volume\",\"type\":\"number\"},\"volume_24h_change_24h\":{\"description\":\"24-hour volume change percentage\",\"type\":\"number\"}},\"type\":\"object\"},\"description\":\"Price and market data in different quote currencies\",\"type\":\"object\"},\"rank\":{\"description\":\"Market cap rank\",\"type\":\"integer\"},\"symbol\":{\"description\":\"Ticker symbol of the cryptocurrency\",\"type\":\"string\"},\"total_supply\":{\"description\":\"Total supply of the coin\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with ticker data for all coins\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/tickers","segments":[{"lit":"tickers"}],"select":{"exist":["quote"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ticker","name__orig":"ticker","Name":"Ticker","name_":"ticker","name-":"ticker","NAME":"TICKER","index$":1}, {"active":true,"entity":"ticker","key$":"BasicTickerFlow","kind":"basic","name":"BasicTickerFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"ticker_ref01"}}],"index$":0}]}, 'Ticker')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ticker_ref01_data = Object.values(setup.data.existing.ticker)[0] as any

    // LIST
    const ticker_ref01_ent = client.Ticker()
    const ticker_ref01_match: any = {}

    const ticker_ref01_list = (await ticker_ref01_ent.list(ticker_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ticker/TickerTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CoinpaprikaSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ticker01','ticker02','ticker03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COINPAPRIKA_TEST_TICKER_ENTID': idmap,
    'COINPAPRIKA_TEST_LIVE': 'FALSE',
    'COINPAPRIKA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COINPAPRIKA_TEST_TICKER_ENTID']

  const live = 'TRUE' === env.COINPAPRIKA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COINPAPRIKA_TEST_TICKER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CoinpaprikaSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.COINPAPRIKA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
