import { FC } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { useAppDispatch } from '../../../app/hooks';
import { logoutStart } from '../../../features/auth/auth-slice';
import { ButtonLink } from '../../atoms/ButtonLink';
import { useNavigate } from 'react-router-dom';

interface Props {
  onDrawerToggle: () => void;
  navItems: string[];
}

export const NavMenu: FC<Props> = ({ onDrawerToggle, navItems }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLinkClick = (item: string = '/') => navigate(item);

  const handleLogout = () => {
    dispatch(logoutStart());
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
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
            <ButtonLink key={item} item={item} onClick={handleLinkClick} />
          ))}

          <ButtonLink item="Logout" onClick={handleLogout} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
