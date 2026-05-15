# Coinpaprika SDK utility: make_context

from core.context import CoinpaprikaContext


def make_context_util(ctxmap, basectx):
    return CoinpaprikaContext(ctxmap, basectx)
