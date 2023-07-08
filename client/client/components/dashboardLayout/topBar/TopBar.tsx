'use client';

import { useState, MouseEvent, useCallback, useEffect, useRef } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import { Logout, PersonOutline } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AppRoute } from '@/AppRoute';
import { getInitials } from '@/client/common/utils';
import { useMutationCustom } from '@/api/useMutationCustom';
import { LOGOUT_URL } from '@/api/request/auth/signout';
import { useProfile } from '@/client/common/hooks/useProfile';
import { PROFILE_KEY } from '@/api/request/profile';

import * as styles from './TopBar.styles';

export const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useRouter();
  const { profile, setProfile } = useProfile();

  const { mutate } = useMutationCustom({
    mutationFn: axios => () => axios.post(LOGOUT_URL),
    mutationKey: PROFILE_KEY,
    onSuccess: () => {
      setProfile(null);
      navigate.push(AppRoute.signIn);
    }
  });

  const avatarContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onMouseEnter = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const mouseMoveListener = useCallback((event: globalThis.MouseEvent) => {
    if (!avatarContainerRef.current) return;
    const offset = 250;
    const { top, right, bottom, left } =
      avatarContainerRef.current.getBoundingClientRect();

    if (event.clientX < left - offset) setAnchorEl(null);
    if (event.clientY < top - offset) setAnchorEl(null);
    if (event.clientX > right + offset) setAnchorEl(null);
    if (event.clientY > bottom + offset) setAnchorEl(null);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveListener);
  }, [mouseMoveListener]);

  const fullName = `${profile?.firstName} ${profile?.lastName}`;
  const initials = getInitials(fullName);

  return (
    <AppBar sx={styles.topBar}>
      <Toolbar sx={styles.wrapper}>
        <Typography variant="h6" component="div">
          Hr_Analytics
        </Typography>
        <Box onMouseEnter={onMouseEnter} ref={avatarContainerRef}>
          <Avatar>{initials}</Avatar>
          <Menu
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem sx={styles.usernameMenuItem} disabled>
              <ListItemIcon>
                <Avatar sx={styles.smallAvatar}>{initials}</Avatar>
              </ListItemIcon>
              <ListItemText>{fullName}</ListItemText>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              component={Link}
              href={AppRoute.profile}
            >
              <ListItemIcon>
                <PersonOutline />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem sx={styles.menuItem} onClick={() => mutate()}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
