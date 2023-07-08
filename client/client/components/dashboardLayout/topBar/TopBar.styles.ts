import { Styles, theme } from '@/client/theme/theme';

export const topBar: Styles = {
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'none',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary
};

export const wrapper: Styles = {
  display: 'flex',
  justifyContent: 'space-between'
};

export const smallAvatar: Styles = {
  width: '24px',
  height: '24px',
  fontSize: '14px'
};

export const menuItem: Styles = {
  paddingY: 1.5
};

export const usernameMenuItem: Styles = {
  ...menuItem,
  pointerEvents: 'none',
  '&.Mui-disabled': {
    opacity: 1
  }
};
