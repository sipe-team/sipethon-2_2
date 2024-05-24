import decimal

from pydantic import BaseModel


class ScenarioSaveDto(BaseModel):
    strategy: str
    currency_pair: str
    asset: decimal.Decimal


class ScenarioPlayDto(BaseModel):
    ticker: str
    start_time: int
    end_time: int