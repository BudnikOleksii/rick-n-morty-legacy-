import React, { FC } from 'react';
import Button from '@mui/material/Button';

interface Props {
  onConfirm: () => void;
}

export const ConfirmButton: FC<Props> = ({ onConfirm }) => (
  <Button
    variant="contained"
    sx={{ display: 'block', margin: '10px auto', minWidth: '130px' }}
    color="error"
    onClick={onConfirm}
  >
    Confirm
  </Button>
);
