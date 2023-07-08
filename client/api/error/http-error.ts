import { useCallback } from 'react';

import { isAxiosError } from 'axios';
import { useTranslate } from '@/client/contex/translations/useTranslate';

type KnownHttpErrorStatus = '400' | '401' | '404' | '500';
type KnownHttpErrorMessage = `error_${KnownHttpErrorStatus}`;

export type HttpErrorMap = Partial<Record<string | 'all', string>>;

const defaultHttpErrorMap: Record<KnownHttpErrorStatus, KnownHttpErrorMessage> =
  {
    '400': 'error_400',
    '401': 'error_401',
    '404': 'error_404',
    '500': 'error_500'
  };

export type ValidateErrorsProps = {
  error: unknown;
  httpErrorMap?: HttpErrorMap;
};

function isExpectedCode(code: string): code is KnownHttpErrorStatus {
  return Object.keys(defaultHttpErrorMap).includes(code);
}

const defaultErrorMessage = (code: string): KnownHttpErrorMessage =>
  isExpectedCode(code) ? defaultHttpErrorMap[code] : defaultHttpErrorMap['500'];

export const useParseError = () => {
  const translate = useTranslate();
  return useCallback(
    ({ error, httpErrorMap }: ValidateErrorsProps) => {
      if (httpErrorMap?.all) {
        return httpErrorMap.all;
      }
      if (isAxiosError(error) && error.response !== undefined) {
        return (
          httpErrorMap?.[error.response.status] ??
          translate(defaultErrorMessage(`${error.response.status}`))
        );
      }
      return translate(defaultHttpErrorMap['500']);
    },
    [translate]
  );
};
