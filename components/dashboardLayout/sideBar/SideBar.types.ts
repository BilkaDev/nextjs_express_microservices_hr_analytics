import { ReactNode } from 'react';

import { AppRoute } from '../../../AppRoute';

type AvailableCategory = 'home' | 'jobs' | 'candidates' | 'calendar';

export type SideBarItem = {
  url: AppRoute;
  text: AvailableCategory;
  icon: ReactNode;
};
