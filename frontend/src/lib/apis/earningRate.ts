/* eslint-disable import/prefer-default-export */

import { EarningRate } from '../types/earningRate';

import api from '.';

export const getEarningRate = async () => {
  const response = await api<EarningRate>({
    url: '/v1/earning_rate',
    method: 'POST',
  });

  return response;
};
