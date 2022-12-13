import { useState, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logoutStart } from '../../../features/auth/auth-slice';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../constants';

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutStart());
  };

  const handleLinkClick = (path: string) => {
    handleClose();
    navigate(path);
  };

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
        color="secondary"
      >
        Profile
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>{`Rating: ${user?.rating || 0}`}</MenuItem>
        <MenuItem>{`Balance: ${user?.balance || 0}`}</MenuItem>
        <MenuItem onClick={() => handleLinkClick('/')}>Your cards</MenuItem>
        <MenuItem onClick={() => handleLinkClick(PATHS.transactions)}>History</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
