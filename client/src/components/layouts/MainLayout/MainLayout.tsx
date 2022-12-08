import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import Box from '@mui/material/Box';
import { PATHS } from '../../../constants';
import { BurgerMenu } from '../../organisms/BurgerMenu';
import { NavMenu } from '../../organisms/NavMenu';

const { cards, characters, lots, sets, chat, faq, users } = PATHS;
const defaultNavItems = [lots, characters, sets, chat, faq].map((item) => item.slice(1));
const adminNavItems = [users, cards].map((item) => item.slice(1));

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
