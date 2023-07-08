'use client';

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import Link from 'next/link';

import { useTranslate } from '@/client/contex/translations/useTranslate';

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
              component={Link}
              href={item.url}
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
