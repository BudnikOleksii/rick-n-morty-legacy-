import { FC, memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import { ListItemLink } from '../../atoms/ListItemLink';
import { useNavigate } from 'react-router-dom';

interface Props {
  open?: boolean;
  onDrawerToggle: () => void;
  navItems: string[];
}

const drawerWidth = 240;

export const BurgerMenu: FC<Props> = memo(({ open, onDrawerToggle, navItems }) => {
  const navigate = useNavigate();

  const handleLinkClick = (item: string = '/') => navigate(item);

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={open}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Box onClick={onDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Rick and Morty App
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItemLink key={item} item={item} onClick={handleLinkClick} />
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
});
