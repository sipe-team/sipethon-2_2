import api from '.';

export const getTicker = async () => {
  const response = await api<any>({
    url: '/v1/scenario/{ticker}',
    method: 'POST',
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
