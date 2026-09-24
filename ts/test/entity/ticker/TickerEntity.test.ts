

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"beta_value":{"a":true,"h":"Beta Value","n":"beta_value","r":false,"sh":"Beta value for the coin","t":"`$NUMBER`","key$":"beta_value","index$":0},"circulating_supply":{"a":true,"h":"Circulating Supply","n":"circulating_supply","r":false,"sh":"Circulating supply of the coin","t":"`$NUMBER`","key$":"circulating_supply","index$":1},"first_data_at":{"a":true,"fo":"date-time","h":"First Data At","n":"first_data_at","r":false,"sh":"Date of first data availability","t":"`$STRING`","key$":"first_data_at","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the coin","t":"`$STRING`","key$":"id","index$":3},"last_updated":{"a":true,"fo":"date-time","h":"Last Updated","n":"last_updated","r":false,"sh":"Last update timestamp","t":"`$STRING`","key$":"last_updated","index$":4},"max_supply":{"a":true,"h":"Max Supply","n":"max_supply","r":false,"sh":"Maximum supply of the coin","t":"`$NUMBER`","key$":"max_supply","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the cryptocurrency","t":"`$STRING`","key$":"name","index$":6},"quotes":{"a":true,"h":"Quotes","n":"quotes","r":false,"sh":"Price and market data in different quote currencies","t":"`$OBJECT`","key$":"quotes","index$":7},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"Market cap rank","t":"`$INTEGER`","key$":"rank","index$":8},"symbol":{"a":true,"h":"Symbol","n":"symbol","r":false,"sh":"Ticker symbol of the cryptocurrency","t":"`$STRING`","key$":"symbol","index$":9},"total_supply":{"a":true,"h":"Total Supply","n":"total_supply","r":false,"sh":"Total supply of the coin","t":"`$NUMBER`","key$":"total_supply","index$":10}},"id":{"field":"id","name":"id"},"name":"ticker","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /tickers","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"USD","k":"query","n":"quote","or":"quote","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/tickers","q":{"exist":["quote"]},"r":{},"s":[{"lit":"tickers"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ticker","name__orig":"ticker","Name":"Ticker","name_":"ticker","name-":"ticker","NAME":"TICKER","index$":1}, {"active":true,"entity":"ticker","key$":"BasicTickerFlow","kind":"basic","name":"BasicTickerFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"ticker_ref01"}}],"index$":0}]}, 'Ticker', {"GET /tickers":{"protocol":"http","operationId":"getTickers","responses":{"200":{"description":"Successful response with ticker data for all coins","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Unique identifier for the coin","key$":"id"},"name":{"type":"string","description":"Name of the cryptocurrency","key$":"name"},"symbol":{"type":"string","description":"Ticker symbol of the cryptocurrency","key$":"symbol"},"rank":{"type":"integer","description":"Market cap rank","key$":"rank"},"circulating_supply":{"type":"number","description":"Circulating supply of the coin","key$":"circulating_supply"},"total_supply":{"type":"number","description":"Total supply of the coin","key$":"total_supply"},"max_supply":{"type":"number","description":"Maximum supply of the coin","nullable":true,"key$":"max_supply"},"beta_value":{"type":"number","description":"Beta value for the coin","key$":"beta_value"},"first_data_at":{"type":"string","format":"date-time","description":"Date of first data availability","key$":"first_data_at"},"last_updated":{"type":"string","format":"date-time","description":"Last update timestamp","key$":"last_updated"},"quotes":{"type":"object","description":"Price and market data in different quote currencies","additionalProperties":{"type":"object","properties":{"price":{"type":"number","description":"Current price"},"volume_24h":{"type":"number","description":"24-hour trading volume"},"volume_24h_change_24h":{"type":"number","description":"24-hour volume change percentage"},"market_cap":{"type":"number","description":"Market capitalization"},"market_cap_change_24h":{"type":"number","description":"24-hour market cap change percentage"},"percent_change_15m":{"type":"number","description":"Price change percentage in last 15 minutes"},"percent_change_30m":{"type":"number","description":"Price change percentage in last 30 minutes"},"percent_change_1h":{"type":"number","description":"Price change percentage in last 1 hour"},"percent_change_6h":{"type":"number","description":"Price change percentage in last 6 hours"},"percent_change_12h":{"type":"number","description":"Price change percentage in last 12 hours"},"percent_change_24h":{"type":"number","description":"Price change percentage in last 24 hours"},"percent_change_7d":{"type":"number","description":"Price change percentage in last 7 days"},"percent_change_30d":{"type":"number","description":"Price change percentage in last 30 days"},"percent_change_1y":{"type":"number","description":"Price change percentage in last 1 year"},"ath_price":{"type":"number","description":"All-time high price","nullable":true},"ath_date":{"type":"string","format":"date-time","description":"Date of all-time high","nullable":true},"percent_from_price_ath":{"type":"number","description":"Percentage from all-time high price","nullable":true}},"x-ref":"#/components/schemas/Quote"},"key$":"quotes"}},"x-ref":"#/components/schemas/Ticker","index$":0}},"example":[{"id":"btc-bitcoin","name":"Bitcoin","symbol":"BTC","rank":1,"circulating_supply":19000000,"total_supply":21000000,"max_supply":21000000,"beta_value":1,"first_data_at":"2010-07-17T00:00:00Z","last_updated":"2023-10-01T12:00:00Z","quotes":{"USD":{"price":50000,"volume_24h":30000000000,"volume_24h_change_24h":5.5,"market_cap":950000000000,"market_cap_change_24h":2.3,"percent_change_15m":0.5,"percent_change_30m":0.8,"percent_change_1h":1.2,"percent_change_6h":2.5,"percent_change_12h":3.1,"percent_change_24h":4.5,"percent_change_7d":8.2,"percent_change_30d":15.3,"percent_change_1y":120.5,"ath_price":69000,"ath_date":"2021-11-10T00:00:00Z","percent_from_price_ath":-27.5}}}]}}},"400":{"description":"Bad request - Invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"quotes","in":"query","description":"Comma separated list of quotes to return (e.g., USD,BTC,ETH)","required":false,"schema":{"type":"string","default":"USD"},"index$":0}],"securitySource":"unspecified"}})
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
  
