import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NAME_SPACES, PATHS } from '../../../constants';

export const FaqDropdown = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinkClick = (path: string) => {
    handleClose();
    navigate(path);
  };

  return (
    <div style={{ marginRight: '10px', marginLeft: 'auto' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
        color="secondary"
      >
        {t(`dropdowns.faq`, { ns: NAME_SPACES.main })}
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
        <MenuItem onClick={() => handleLinkClick(PATHS.characters)}>
          {t(`paths.characters`, { ns: NAME_SPACES.main })}
        </MenuItem>
        <MenuItem onClick={() => handleLinkClick(PATHS.sets)}>
          {t(`paths.sets`, { ns: NAME_SPACES.main })}
        </MenuItem>
        <MenuItem onClick={() => handleLinkClick(PATHS.cards)}>
          {t(`paths.cards`, { ns: NAME_SPACES.main })}
        </MenuItem>
      </Menu>
    </div>
  );
};
