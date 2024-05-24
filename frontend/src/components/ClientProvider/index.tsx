'use client';

import { PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';

function ClientProver({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}

export default ClientProver;
