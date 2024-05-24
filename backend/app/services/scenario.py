from app.api.routes.scenario import ScenarioSaveDto, ScenarioPlayDto
from app.schemas.TickerInfo import TradeInfo, TradeUser
from app.services.strategy.StrategyFactory import StrategyFactory
from app.services.ticker.TickerStorageFactory import TickerStorageFactory


class ScenarioService:
    def __init__(self):
        self.strategyFactory = StrategyFactory()
        self.tickerStorageFactory = TickerStorageFactory()
        self.strategy = "MA"
        self.currency_pair = "KRW_BTC"
        self.ticker = "minute1"
        self.status = "true"
        self.realtime = 0
        self.info = TradeInfo()
        self.asset = 0

    def save_scenario_data(self, scenarioSaveDto: ScenarioSaveDto):
        self.strategy = scenarioSaveDto.strategy
        self.currency_pair = scenarioSaveDto.currency_pair
        self.asset = scenarioSaveDto.asset
        self.realtime = 0
        return self.status

    def play_scenario_data(self, scenarioPlayDto: ScenarioPlayDto):
        strategy = self.strategyFactory.create_strategy(self.strategy)
        csvStorage = self.tickerStorageFactory.create_ticker_storage(self.realtime)
        return strategy.calculate(csvStorage, self.currency_pair, scenarioPlayDto.ticker, self.info, self.asset)
