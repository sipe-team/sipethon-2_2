class TradeInfo:
    index: int = 1
    sellOrderList: []
    buyOrderList: []

class TradeUser:
    def __init__(self, asset):
        self.asset = asset

# RSI 20 미만 인경우 매수
# 봉 -> RSI 20 구간 -> 매수 주문
# 다음 봉 -> 매수 / 안할 수 있음
# 다음 봉 -> 체결이 됨
# 1억에 사겠어 -> 주문
# low - high -> 매수 체결