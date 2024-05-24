'use client';

import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import styles from './index.module.scss';

function SubTitle({ children }: PropsWithChildren) {
  return <div className={clsx(styles.wrapper)}>{children}</div>;
}

export default SubTitle;
