export type ScenarioTickerRequest = {
  start_time: number;
  end_time: number;
};

export type ScenariosTickerResponse = ScenariosTicker[];

export interface ScenariosTicker {
  code: 'BTC/KRW';
  high: number;
  open: number;
  close: number;
  low: number;
  buySignal: number; // 주문
  buyInfo: BuyInfo[]; // 채결
  sellSignal: number;
  sellInfo: SellInfo[];
  currentTime: number;
  hasMore: boolean;
}

export type BuyInfo = {
  price: number;
  amount: number;
};

export type SellInfo = BuyInfo;
