import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logoutStart } from '../../../features/auth/auth-slice';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { useNavigate } from 'react-router-dom';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { NAME_SPACES, PATHS } from '../../../constants';

export const ProfileDropdown = () => {
  const { t } = useTranslation();
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
    dispatch(registerAction(logoutStart.type));
    dispatch(logoutStart());
  };

  const handleLinkClick = (path: string) => {
    handleClose();
    navigate(path);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
        color="secondary"
      >
        {t(`dropdowns.profile`, { ns: NAME_SPACES.main })}
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
        <MenuItem>
          {t(`profile.rating`, { ns: NAME_SPACES.main, rating: user?.rating || 0 })}
        </MenuItem>
        <MenuItem>
          {t(`profile.balance`, { ns: NAME_SPACES.main, balance: user?.balance || 0 })}
        </MenuItem>
        <MenuItem onClick={() => handleLinkClick('/')}>
          {t(`paths.my_cards`, { ns: NAME_SPACES.main })}
        </MenuItem>
        <MenuItem onClick={() => handleLinkClick(PATHS.transactions)}>
          {t(`paths.payments`, { ns: NAME_SPACES.main })}
        </MenuItem>
        <MenuItem onClick={handleLogout}>{t(`paths.logout`, { ns: NAME_SPACES.main })}</MenuItem>
      </Menu>
    </div>
  );
};
