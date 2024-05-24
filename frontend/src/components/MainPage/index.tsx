'use client';

import MainForm from '../MainForm';
import ResultCounter from '../ResultCounter';
import SampleChart3 from '../SampleChart3';

type Props = {
  strategy?: string;
  currency?: string;
  asset?: string;
};

function MainPage({ asset, currency, strategy } : Props) {
  return (
    <>
      {strategy && currency && asset ? (
        <div>
          <ResultCounter />
          <SampleChart3 />
        </div>
      ) : (
        <MainForm />
      )}
    </>
  );
}

export default MainPage;
