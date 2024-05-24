'use client';

import { useSearchParams } from 'next/navigation';

import MainForm from '../MainForm';
import ResultCounter from '../ResultCounter';
import SampleChart3 from '../SampleChart3';

function MainPage() {
  const searchParams = useSearchParams();

  const strategy = searchParams.get('strategy');
  const currency = searchParams.get('currency');
  const asset = searchParams.get('asset');

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
