from app.schemas.Dto import ScenarioSaveDto, ScenarioPlayDto
from app.services.scenario import ScenarioService

from fastapi import APIRouter

router = APIRouter()
scenario_service = ScenarioService()





@router.post("/v1/scenario", status_code=200)
def scenario(scenarioDto: ScenarioSaveDto) -> dict:
    return {"result": scenario_service.save_scenario_data(scenarioDto)}


@router.post("/v1/scenario/ticker", status_code=200)
def scenario(scenarioDto: ScenarioPlayDto) -> dict:
    # return {"result": scenario_service.play_scenario_data(scenarioDto)}

    # 매수 매도 정보만 리턴
    return {"result": scenario_service.play_scenario_data(scenarioDto)}
    #return {"result": scenario_service.play_scenario_data(scenarioDto)[:15].to_dict()}
