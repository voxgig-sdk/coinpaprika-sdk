# Coinpaprika SDK feature factory

from feature.base_feature import CoinpaprikaBaseFeature
from feature.test_feature import CoinpaprikaTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CoinpaprikaBaseFeature(),
        "test": lambda: CoinpaprikaTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
