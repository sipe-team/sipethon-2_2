import { numberWithComma } from '@/utils';

type Props = {
  rate: number;
};

function ResultCounter({ rate }: Props) {
  const defaultAsset = 5000000;
  const resultAsset = Math.ceil(defaultAsset + defaultAsset * (rate / 100));

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-4">수익률</div>
      <div />
      <div className="text-5xl font-bold text-green-500 mb-2">
        {/* <CountUp end={25000} duration={3} /> */}
        {numberWithComma(Math.ceil(defaultAsset + defaultAsset * (rate / 100)))}
        원
      </div>
      <div className={`text-3xl font-bold ${resultAsset - defaultAsset < 0 ? 'text-blue-500' : 'text-red-500'} mb-2`}>
        {/* <CountUp end={100} duration={3} /> */}
        {`${resultAsset - defaultAsset < 0 ? '-' : '+'}${numberWithComma(Math.abs(defaultAsset - resultAsset))}원 (${Math.abs(rate).toFixed(2)}%)`}
      </div>
    </div>
  );
}

export default ResultCounter;
