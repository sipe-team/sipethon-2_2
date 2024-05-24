from backtesting import Backtest
from backtesting import Strategy
from backtesting.lib import crossover
import pandas as pd

def RSI(values, n):
    """Relative strength index"""
    # Approximate; good enough
    gain = pd.Series(values).diff()
    loss = gain.copy()
    gain[gain < 0] = 0
    loss[loss > 0] = 0
    rs = gain.ewm(n).mean() / loss.abs().ewm(n).mean()
    return 100 - 100 / (1 + rs)

class RsiCross(Strategy):
    lower_bound = 30
    upper_bound = 70
    lookback_period = 14
    index = 0

    def init(self):
        self.rsi = self.I(RSI, self.data.Close, self.lookback_period)

    def next(self):
        if crossover(self.lower_bound, self.rsi):
            self.position.close()
            self.buy()
        elif crossover(self.rsi, self.upper_bound):
            self.position.close()
            self.sell()
        self.index += 1
