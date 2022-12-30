import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { NAME_SPACES } from '../../../constants';

interface Props {
  onConfirm: () => void;
}

export const ConfirmButton: FC<Props> = ({ onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      sx={{ display: 'block', margin: '10px auto', minWidth: '130px' }}
      color="error"
      onClick={onConfirm}
    >
      {t('buttons.confirm', { ns: NAME_SPACES.main })}
    </Button>
  );
};
