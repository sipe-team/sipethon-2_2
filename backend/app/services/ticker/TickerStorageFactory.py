class TickerStorageFactory:
    def __init__(self):
        self.strategy = None

    def create_ticker_storage(self, realtime: int):
        if realtime == 0:
            from app.services.ticker.TickerCsvStorage import TickerCsvStorage
            self.ticker_storage = TickerCsvStorage()
        return self.ticker_storage