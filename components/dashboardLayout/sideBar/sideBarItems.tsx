import {
  CalendarMonth,
  ChatBubbleOutline,
  HomeOutlined,
  PersonOutlined
} from '@mui/icons-material';

import { AppRoute } from '../../../AppRoute';

import { SideBarItem } from './SideBar.types';

export const sideBarItems: SideBarItem[] = [
  { text: 'home', url: AppRoute.dashboard, icon: <HomeOutlined /> },
  { text: 'jobs', url: AppRoute.jobs, icon: <ChatBubbleOutline /> },
  { text: 'candidates', url: AppRoute.candidates, icon: <PersonOutlined /> },
  { text: 'calendar', url: AppRoute.calendar, icon: <CalendarMonth /> }
];
