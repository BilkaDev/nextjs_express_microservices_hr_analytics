import { ReactNode } from 'react';

export type OnTokenSaveArgs = {
  newToken: string;
  storeTokenInStorage: boolean;
};

export type TokenContextValue = {
  accessToken: string | null;
  onTokenSave: (args: OnTokenSaveArgs) => void;
};

export type TokenContextProviderProps = {
  children: ReactNode;
};
