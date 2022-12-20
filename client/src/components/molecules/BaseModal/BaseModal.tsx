import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { modalStyles } from '../../../modal-styles';

interface Props {
  openModalTitle: string;
  buttonVariant?: 'outlined' | 'text' | 'contained';
  buttonColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  open: boolean;
  onOpenChange: (state: boolean) => void;
  children: ReactNode;
}

export const BaseModal: FC<Props> = ({
  openModalTitle,
  children,
  buttonVariant,
  buttonColor,
  open,
  onOpenChange,
}) => (
  <div>
    <Button
      sx={{ display: 'block', margin: '10px auto', minWidth: '130px' }}
      variant={buttonVariant}
      color={buttonColor}
      onClick={() => onOpenChange(true)}
    >
      {openModalTitle}
    </Button>
    <Modal
      open={open}
      onClose={() => onOpenChange(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles}>{children}</Box>
    </Modal>
  </div>
);
