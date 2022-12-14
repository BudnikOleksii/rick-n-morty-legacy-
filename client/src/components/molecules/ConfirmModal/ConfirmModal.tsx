import React, { FC } from 'react';
import Button from '@mui/material/Button';
import { BaseModal } from '../BaseModal';

interface Props {
  buttonTitle: string;
  buttonColor?: 'error' | 'inherit' | 'primary' | 'secondary' | 'success' | 'info' | 'warning';
  confirmText: string;
  onConfirm: () => void;
}

export const ConfirmModal: FC<Props> = ({ buttonTitle, buttonColor, confirmText, onConfirm }) => {
  return (
    <BaseModal openModalTitle={buttonTitle} buttonVariant="contained" buttonColor={buttonColor}>
      {confirmText}
      <Button
        variant="contained"
        sx={{ display: 'block', margin: '10px auto', minWidth: '130px' }}
        color="error"
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </BaseModal>
  );
};
