import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAuth } from '../features/auth/auth-selectors';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PATHS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { cardsLoadingStart, cardsRemoveErrors } from '../features/cards/cards-slice';
import { selectCards } from '../features/cards/cards-selectors';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const { cards, lots, sets, chat, faq, users } = PATHS;
const drawerWidth = 240;
const defaultNavItems = [lots, cards, sets, chat, faq].map((item) => item.slice(1));

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAdmin } = useAppSelector(selectAuth);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navItems = isAdmin ? [users.slice(1), ...defaultNavItems] : defaultNavItems;

  const { cards, cardsInfo, cardsIsloading, cardsErrors } = useAppSelector(selectCards);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  console.log(cards);

  useEffect(() => {
    if (user) {
      dispatch(cardsLoadingStart(user.id));
    }
  }, []);

  const handleLinkClick = (item: string) => navigate(item);
  const handleCloseNotification = () => dispatch(cardsRemoveErrors());

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleLinkClick(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Rick and Morty App
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick={() => handleLinkClick(item)}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3, width: '100%' }}>
        <Toolbar />
        {cardsIsloading && <LinearProgress />}
        {cardsErrors && (
          <Snackbar open={!!cardsErrors} autoHideDuration={3000} onClose={handleCloseNotification}>
            <Alert onClose={handleCloseNotification} severity="error" sx={{ width: '100%' }}>
              {cardsErrors}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default Home;
