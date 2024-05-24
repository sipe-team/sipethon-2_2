from app.services.ticker.TickerStorage import TickerStorage

import pandas as pd


class TickerCsvStorage(TickerStorage):
    def __init__(self):
        self.ticker = None

    def get_ticker(self, currency_pair: str, ticker: str):
        baseCurrency = currency_pair.split("_")[1]
        return pd.read_csv("data/csv/" + baseCurrency + "/" + currency_pair + "_" + ticker + ".csv")
