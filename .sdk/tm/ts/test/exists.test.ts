
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CoinpaprikaSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CoinpaprikaSDK.test()
    equal(testsdk instanceof CoinpaprikaSDK, true,
      'CoinpaprikaSDK.test() must return a client synchronously')
  })

})
