import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { PATHS } from '../../../constants';

export const FaqDropdown = () => {
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
        FAQ
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
        <MenuItem onClick={() => handleLinkClick(PATHS.characters)}>Characters</MenuItem>
        <MenuItem onClick={() => handleLinkClick(PATHS.sets)}>Sets</MenuItem>
        <MenuItem onClick={() => handleLinkClick(PATHS.cards)}>All cards</MenuItem>
      </Menu>
    </div>
  );
};
