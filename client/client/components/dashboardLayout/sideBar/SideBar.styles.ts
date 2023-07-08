import { Styles, theme } from '@/client/theme/theme';
import {
  drawerWidth,
  topBarHeight
} from '@/client/components/dashboardLayout/DashboardLayout.styles';

export const sideBar: Styles = {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    paddingTop: `${topBarHeight}px`,
    border: 'none',
    width: drawerWidth,
    background: theme.palette.grey[200],
    boxSizing: 'border-box'
  }
};

export const menuList: Styles = {
  flexGrow: 1,
  paddingTop: 0
};

export const navLink: Styles = {
  paddingY: 2,
  borderTopRightRadius: 50,
  borderBottomRightRadius: 50,
  marginBottom: 0.5,
  '&.active': {
    background: theme.palette.grey[400],
    boxShadow: `0 0 1px ${theme.spacing(0.5)} ${theme.palette.grey[200]}`
  }
};

export const navLinkIcon: Styles = {
  minWidth: '40px'
};
