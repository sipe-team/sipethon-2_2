/* eslint-disable import/prefer-default-export */
import api from '.';

export const getEarningRate = async () => {
  const response = await api<any>({
    url: '/v1/earning_rate',
    method: 'POST',
  });

  return response;
};
