import { useCallback, useMemo, useState } from 'react';

import { TokenContext } from './TokenContext';
import {
  OnTokenSaveArgs,
  TokenContextProviderProps
} from './TokenContext.type';

export const tokenStorageKey = 'accessToken';
export const TokenContextProvider = ({
  children
}: TokenContextProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(tokenStorageKey)
  );

  const onTokenSave = useCallback(
    ({ newToken, storeTokenInStorage }: OnTokenSaveArgs) => {
      setAccessToken(newToken);
      if (storeTokenInStorage) {
        localStorage.setItem(tokenStorageKey, newToken);
      }
    },
    []
  );

  const contextValues = useMemo(
    () => ({ accessToken, onTokenSave }),
    [accessToken, onTokenSave]
  );

  return (
    <TokenContext.Provider value={contextValues}>
      {children}
    </TokenContext.Provider>
  );
};
