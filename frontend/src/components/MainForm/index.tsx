'use client';

import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Button, Input, Select, SelectItem,
} from '@nextui-org/react';

const strategyData = [
  { id: 1, value: 'rsi', label: 'RSI 전략' },
  { id: 2, value: 'ma', label: '이동평균선' },
];

const currencyData = [
  { id: 1, value: 'btc_krw', label: '비트코인' },
  { id: 2, value: 'eth_krw', label: '이더리움' },
];

function MainForm() {
  const router = useRouter();
  const [strategy, setStrategy] = useState<string>();
  const [currency, setCurrency] = useState<string>();
  const [asset, setAsset] = useState<string>('');

  const handleChangeStrategy = (e: ChangeEvent<HTMLSelectElement>) => {
    setStrategy(e.target.value);
  };

  const handleChangeCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleChangeAsset = (e: ChangeEvent<HTMLInputElement>) => {
    setAsset(e.target.value);
  };

  const handleClickButton = () => {
    if (!strategy || !currency || !asset) {
      return;
    }

    router.push(`/?strategy=${strategy}&currency=${currency}&asset=${asset}`);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <Select
        label="투자 전략"
        placeholder="투자 전략을 선택해주세요."
        labelPlacement="outside"
        className="py-2 text-sm font-medium"
        items={strategyData}
        onChange={handleChangeStrategy}
      >
        {(strategyItem) => <SelectItem key={strategyItem.value}>{strategyItem.label}</SelectItem>}
      </Select>

      <Select
        label="투자 종목"
        placeholder="투자 종목을 선택해주세요."
        labelPlacement="outside"
        className="py-2 text-sm font-medium"
        items={currencyData}
        onChange={handleChangeCurrency}
      >
        {(currencyItem) => <SelectItem key={currencyItem.value}>{currencyItem.label}</SelectItem>}
      </Select>

      <Input
        type="number"
        label="투자 금액"
        placeholder="0"
        min={0}
        labelPlacement="outside"
        className="py-2 text-sm font-medium"
        value={asset}
        onChange={handleChangeAsset}
        endContent={(
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">₩</span>
          </div>
            )}
      />
      <Button fullWidth className="mt-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={handleClickButton}>수익률 계산하기</Button>
    </div>
  );
}

export default MainForm;
