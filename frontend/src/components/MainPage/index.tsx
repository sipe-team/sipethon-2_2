'use client';

import { useEffect, useState } from 'react';

import Lottie from 'lottie-react';

import coinConfettiAnimationLottie from '@/lib/data/lotties/coin-confetti.json';
import coinSpinnerAnimationLottie from '@/lib/data/lotties/coin-spinner.json';

import MainForm from '../MainForm';
import ResultCounter from '../ResultCounter';
import SampleChart3 from '../SampleChart3';

import styles from './index.module.scss';

type Props = {
  strategy?: string;
  currency?: string;
  asset?: string;
};

function MainPage({ asset, currency, strategy } : Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    if (!strategy || !currency || !asset) {
      return;
    }

    const id = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(id);
    };
  }, [strategy, currency, asset]);

  return (
    <>
      {strategy && currency && asset ? (
        <>
          {isVisible ? (
            <div className="flex flex-col gap-20 w-full max-w-6xl rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className={styles.lottieWrapper}>
                <Lottie animationData={coinConfettiAnimationLottie} loop={2} autoPlay={false} style={{ width: '100%', height: '100%' }} />
              </div>
              <ResultCounter rate={rate} asset={asset} />
              <SampleChart3 setRate={setRate} />
            </div>
          ) : (
            <Lottie animationData={coinSpinnerAnimationLottie} loop />
          )}
        </>
      ) : (
        <MainForm />
      )}
    </>
  );
}

export default MainPage;
