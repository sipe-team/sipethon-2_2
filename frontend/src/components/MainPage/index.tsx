'use client';

import { useEffect, useState } from 'react';

import Lottie from 'lottie-react';

import coinSpinnerAnimationLottie from '@/lib/data/lotties/coin-spinner.json';

import MainForm from '../MainForm';
import ResultCounter from '../ResultCounter';
import SampleChart3 from '../SampleChart3';

type Props = {
  strategy?: string;
  currency?: string;
  asset?: string;
};

function MainPage({ asset, currency, strategy } : Props) {
  const [isVisible, setIsVisible] = useState(false);

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
        <div>
          {isVisible ? (
            <>
              <ResultCounter />
              <SampleChart3 />
            </>
          ) : (
            <Lottie animationData={coinSpinnerAnimationLottie} loop />
          )}
        </div>
      ) : (
        <MainForm />
      )}
    </>
  );
}

export default MainPage;
