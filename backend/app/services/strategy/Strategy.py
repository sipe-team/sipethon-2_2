from abc import ABCMeta, abstractmethod

from app.schemas.TickerInfo import TradeUser, TradeInfo
from app.services.ticker import TickerStorage


class Strategy(metaclass=ABCMeta):
    def __init__(self):
        self.strategy = None

    @abstractmethod
    def calculate(self, tickerStorage: TickerStorage, currency_pair: str, ticker: str, tradeInfo: TradeInfo, user: TradeUser):
        pass