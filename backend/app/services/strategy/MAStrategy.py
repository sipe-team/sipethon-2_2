import pandas as pd
from pandas import DataFrame

from app.schemas.TickerInfo import TradeUser, TradeInfo
from app.services.strategy.Strategy import Strategy
from app.services.ticker import TickerStorage


class MAStrategy(Strategy):
    def __init__(self):
        self.strategy = "MA"

    def calculate(self, tickerStorage: TickerStorage, currency_pair: str, ticker: str, tradeInfo: TradeInfo, user: TradeUser):
        ohlcv = tickerStorage.get_ticker(currency_pair, ticker)
        pd.set_option('display.float_format', lambda x: '%.1f' % x)
        ma = ohlcv['close'].rolling(3).mean()

        nowOhlcv = ohlcv[tradeInfo.now:tradeInfo.now +1]
        nowMa = ma[tradeInfo.now:tradeInfo.now +1]

        if nowOhlcv['close'].values[0] > nowMa.values[0]:
            tradeInfo.sellOrderList.append(self.calculateOrder(nowOhlcv, user))
        tradeInfo.now += 1
        print('tradeInfo.now = {}', tradeInfo.now)
        return ohlcv

    def calculateOrder(self, nowOhlcv: DataFrame, user: TradeUser):
        user.asset
        return nowOhlcv