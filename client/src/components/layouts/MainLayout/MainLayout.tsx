import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { BurgerMenu } from '../../organisms/BurgerMenu';
import { NavMenu } from '../../organisms/NavMenu';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { PATHS } from '../../../constants';
import { LanguageSelect } from '../../molecules/LanguageSelect';

const { lots, chats, users } = PATHS;
const defaultNavItems = [lots, chats].map((item) => item.slice(1));
const adminNavItems = [users].map((item) => item.slice(1));

export const MainLayout = () => {
  const { isAdmin } = useAppSelector(selectAuth);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navItems = isAdmin ? [...adminNavItems, ...defaultNavItems] : defaultNavItems;

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  return (
    <Box sx={{ display: 'flex' }}>
      <NavMenu onDrawerToggle={handleDrawerToggle} navItems={navItems} />
      <BurgerMenu open={mobileOpen} onDrawerToggle={handleDrawerToggle} navItems={navItems} />

      <Outlet />
    </Box>
  );
};
