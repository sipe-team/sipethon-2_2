'use client';

import { useState } from 'react';
import CountUp from 'react-countup';

import {
  Button,
  Input, Select,
  SelectItem,
} from '@nextui-org/react';

import styles from './index.module.scss';

const strategyData = [
  { id: 1, value: 'rsi', label: 'RSI 전략' },
  { id: 2, value: 'ma', label: '이동평균선' },
];

const currencyData = [
  { id: 1, value: 'btc_krw', label: '비트코인' },
  { id: 2, value: 'eth_krw', label: '이더리움' },
];

function MainPage() {
  const [strategy, setStrategy] = useState();
  const [currency, setCurrency] = useState();
  const [asset, setAsset] = useState('');

  const handleChangeStrategy = (e:any) => {
    setStrategy(e.target.value);
  };

  const handleChangeCurrency = (e:any) => {
    setCurrency(e.target.value);
  };

  const handleChangeAsset = (e:any) => {
    setAsset(e.target.value);
  };

  const handleClickButton = () => {
    console.log(`strategy: ${strategy}, currency: ${currency}, asset: ${asset}`);
  };

  return (
    <div>
      <div className="text-6xl font-bold mb-2 my-10">껄무새</div>
      <div className="text-large font-medium mb-6">이렇게 샀으면 이만큼 벌었을껄...</div>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <Select
            label="투자 전략"
            placeholder="투자 전략을 선택해주세요."
            labelPlacement="outside"
            className="py-2 text-sm font-medium"
            selectedKeys={strategy ? [strategy] : undefined}
            onChange={handleChangeStrategy}
          >
            {strategyData.map((data) => (
              <SelectItem key={data.value} value={data.value}>
                {data.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="투자 종목"
            placeholder="투자 종목을 선택해주세요."
            labelPlacement="outside"
            className="py-2 text-sm font-medium"
            selectedKeys={currency ? [currency] : undefined}
            onChange={handleChangeCurrency}
          >
            {currencyData.map((data) => (
              <SelectItem key={data.value} value={data.value}>
                {data.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="number"
            label="투자 금액"
            placeholder="0.00"
            labelPlacement="outside"
            className="py-2 text-sm font-medium"
            value={asset}
            onChange={handleChangeAsset}
            endContent={(
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
      )}
          />
          <Button fullWidth className="mt-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={handleClickButton}>수익률 계산하기</Button>
        </div>
        <div className={styles.rightWrapper}>
          <div className="text-2xl font-bold mb-4">수익률</div>
          <div className="text-6xl font-bold text-green-500 mb-2">
            $
            <CountUp end={25000} duration={3} />
          </div>
          <div className="text-6xl font-bold text-red-500 mb-2">
            <CountUp end={100} duration={3} />
            %
          </div>
        </div>

      </div>
    </div>
  );
}

export default MainPage;
