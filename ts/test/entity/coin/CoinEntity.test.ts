

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


describe('CoinEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COINPAPRIKA_TEST_LIVE=TRUE.
  afterEach(liveDelay('COINPAPRIKA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CoinpaprikaSDK.test()
    const ent = testsdk.Coin()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COINPAPRIKA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'coin.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the coin","t":"`$STRING`","key$":"id","index$":0},"is_active":{"a":true,"h":"Is Active","n":"is_active","r":false,"sh":"Indicates if the coin is active","t":"`$BOOLEAN`","key$":"is_active","index$":1},"is_new":{"a":true,"h":"Is New","n":"is_new","r":false,"sh":"Indicates if the coin is new","t":"`$BOOLEAN`","key$":"is_new","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the cryptocurrency","t":"`$STRING`","key$":"name","index$":3},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"Market cap rank","t":"`$INTEGER`","key$":"rank","index$":4},"symbol":{"a":true,"h":"Symbol","n":"symbol","r":false,"sh":"Ticker symbol of the cryptocurrency","t":"`$STRING`","key$":"symbol","index$":5},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of cryptocurrency (coin or token)","t":"`$STRING`","key$":"type","index$":6}},"id":{"field":"id","name":"id"},"name":"coin","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /coins","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/coins","q":{},"r":{},"s":[{"lit":"coins"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"coin","name__orig":"coin","Name":"Coin","name_":"coin","name-":"coin","NAME":"COIN","index$":0}, {"active":true,"entity":"coin","key$":"BasicCoinFlow","kind":"basic","name":"BasicCoinFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"coin_ref01"}}],"index$":0}]}, 'Coin', {"GET /coins":{"protocol":"http","operationId":"getCoins","responses":{"200":{"description":"Successful response with list of coins","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Unique identifier for the coin","key$":"id"},"name":{"type":"string","description":"Name of the cryptocurrency","key$":"name"},"symbol":{"type":"string","description":"Ticker symbol of the cryptocurrency","key$":"symbol"},"rank":{"type":"integer","description":"Market cap rank","key$":"rank"},"is_new":{"type":"boolean","description":"Indicates if the coin is new","key$":"is_new"},"is_active":{"type":"boolean","description":"Indicates if the coin is active","key$":"is_active"},"type":{"type":"string","description":"Type of cryptocurrency (coin or token)","key$":"type"}},"x-ref":"#/components/schemas/Coin","index$":0}},"example":[{"id":"btc-bitcoin","name":"Bitcoin","symbol":"BTC","rank":1,"is_new":false,"is_active":true,"type":"coin"}]}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimitError"},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let coin_ref01_data = Object.values(setup.data.existing.coin)[0] as any

    // LIST
    const coin_ref01_ent = client.Coin()
    const coin_ref01_match: any = {}

    const coin_ref01_list = (await coin_ref01_ent.list(coin_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/coin/CoinTestData.json')

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
    ['coin01','coin02','coin03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COINPAPRIKA_TEST_COIN_ENTID': idmap,
    'COINPAPRIKA_TEST_LIVE': 'FALSE',
    'COINPAPRIKA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COINPAPRIKA_TEST_COIN_ENTID']

  const live = 'TRUE' === env.COINPAPRIKA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COINPAPRIKA_TEST_COIN_ENTID']
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
  
