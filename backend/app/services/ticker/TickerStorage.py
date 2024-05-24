from abc import ABCMeta, abstractmethod


class TickerStorage(metaclass=ABCMeta):
    def __init__(self):
        self.ticker = None

    @abstractmethod
    def get_ticker(self, currency_pair: str, ticker: str):
        pass
