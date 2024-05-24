import CountUp from 'react-countup';

function ResultCounter() {
  return (
    <div>
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
  );
}

export default ResultCounter;
