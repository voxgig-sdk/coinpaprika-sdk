# ProjectName SDK exists test

import pytest
from coinpaprika_sdk import CoinpaprikaSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CoinpaprikaSDK.test(None, None)
        assert testsdk is not None
