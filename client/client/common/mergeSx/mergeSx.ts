import { Styles } from '@/client/theme/theme';

export const mergeSx = (...styleObjects: Styles[]) => {
  return styleObjects.reduce((acc, cur) => ({ ...acc, ...cur }), {});
};
