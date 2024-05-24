class StrategyFactory:
    def __init__(self):
        self.strategy = None

    def create_strategy(self, strategy: str):
        if strategy == 'MA':
            from app.services.strategy.TradeStrategyImpl import TradeStrategyImpl
            self.strategy = TradeStrategyImpl()
        return self.strategy