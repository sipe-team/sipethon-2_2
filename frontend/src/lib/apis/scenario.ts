import { ScenariosTickerResponse, ScenarioTickerRequest } from '../types/scenario';

import api from '.';

export const getTicker = async (params: ScenarioTickerRequest) => {
  const response = await api<ScenariosTickerResponse>({
    url: '/v1/scenario/{ticker}',
    method: 'POST',
    params,
  });

  return response;
};

export const postScenario = async () => {
  const response = await api<any>({
    url: '/v1/scenario',
    method: 'POST',
  });

  return response;
};
