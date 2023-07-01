'use client';

import { createContext } from 'react';

import { TokenContextValue } from './TokenContext.type';

export const TokenContext = createContext<TokenContextValue | undefined>(
  undefined
);
