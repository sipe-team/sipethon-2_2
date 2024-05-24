from pandas import DataFrame
from backtesting import Backtest
import pandas as pd

from app.schemas.TickerInfo import TradeUser, TradeInfo
from app.services.strategy.RsiCross import RsiCross
from app.services.strategy.TradeStrategy import TradeStrategy
from app.services.ticker import TickerStorage

class TradeStrategyImpl(TradeStrategy):
    def __init__(self):
        self.strategy = "MA"
        self.previous_result = pd.DataFrame()


    def calculate(self, tickerStorage: TickerStorage, currency_pair: str, ticker: str, tradeInfo: TradeInfo, asset: int):
        ohlcv = tickerStorage.get_ticker(currency_pair, ticker)
        # df = ohlcv[0: tradeInfo.index]
        df = ohlcv[0: tradeInfo.index]
        bong = ohlcv[tradeInfo.index-1: tradeInfo.index]
        tradeInfo.index += 1
        bt = Backtest(df, RsiCross, cash=asset, commission=0.002)

        stats = bt.run()
        buy_signal = None
        sell_signal = None
        buy_price = None
        sell_price = None
        buy_amount = None
        sell_amount = None
        current_result = stats['_trades']
        print(stats)
        print(current_result)
        if not current_result.equals(self.previous_result) and len(current_result) != 0:
            current_index = len(current_result)-1
            size = current_result['Size'][current_index]
            if size > 0:
                buy_signal = True
                buy_price = current_result['EntryPrice'][current_index]
                buy_amount = size
            else:
                sell_signal = True
                sell_price = current_result['ExitPrice'][current_index]
                sell_amount = size
        self.previous_result = stats['_trades']
        return_rate = stats['Return [%]']
        final_asset = asset * (100.0 + return_rate)

        return             {"final_asset": final_asset, "return_rate": return_rate, "openDateTime": bong.index[0], "openPrice": bong['Open'][0],
                            "closePrice": bong['Close'][0], "highPrice": bong['High'][0], "lowPrice": bong['Low'][0],
                            "buy_signal" : buy_signal, "sell_signal" : sell_signal, "buy_price" : str(buy_price), "sell_price" : str(sell_price),
                            "buy_amount" : str(buy_amount), "sell_amount" : str(sell_amount)}



    ## 라이브러리에 보내야 하는 값
    # - 봉 데이터
    # - 시작, 종료

    ## 라이브러리에서 받는 값
    # - 거래 후 남은 현금
    # - 거래 후 코인 보유 금액
    # - 매수, 매도 배열