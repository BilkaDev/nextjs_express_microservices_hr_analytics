import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useTranslate } from '../../../contex/translations/useTranslate';

import * as styles from './SideBar.styles';
import { sideBarItems } from './sideBarItems';

export const SideBar = () => {
  const translate = useTranslate();

  return (
    <Drawer sx={styles.sideBar} variant="permanent" anchor="left">
      <List sx={styles.menuList}>
        {sideBarItems.map(item => (
          <ListItem key={item.url} disablePadding>
            <ListItemButton
              sx={styles.navLink}
              component={NavLink}
              to={item.url}
            >
              <ListItemIcon sx={styles.navLinkIcon}>{item.icon}</ListItemIcon>
              <ListItemText primary={translate(item.text)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
