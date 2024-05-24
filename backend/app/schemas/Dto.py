import decimal

from pydantic import BaseModel


class ScenarioSaveDto(BaseModel):
    strategy: str
    currency_pair: str
    asset: int


class ScenarioPlayDto(BaseModel):
    ticker: str
    start_time: int
    end_time: int


class ScenarioPlayResponseDto(BaseModel):
    final_asset: decimal.Decimal
    return_rate: float
    openDateTime: str
    openPrice: decimal.Decimal
    closePrice: decimal.Decimal
    highPrice: decimal.Decimal
    lowPrice: decimal.Decimal

