
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CoinpaprikaSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CoinpaprikaSDK.test()
    equal(null !== testsdk, true)
  })

})
