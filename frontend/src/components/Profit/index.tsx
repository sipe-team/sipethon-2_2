'use client';

import { PropsWithChildren } from 'react';

import {
  Button,
} from '@nextui-org/react';
import clsx from 'clsx';

import styles from './index.module.scss';

function Profit({ children }: PropsWithChildren) {
  const handleClickButton = () => {
    console.log('sfs');
  };

  return (
    <div className={clsx(styles.wrapper)}>
      {children}
      <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={handleClickButton}>
        수익률 계산하기
      </Button>
    </div>
  );
}

export default Profit;
