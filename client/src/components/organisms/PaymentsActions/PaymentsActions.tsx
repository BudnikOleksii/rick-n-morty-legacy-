import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { WithdrawalModal } from '../WithdrawalModal';
import { AccountReplenishmentBlock } from '../AccountReplenishmentBlock';
import React from 'react';
import { NAME_SPACES } from '../../../constants';

export const PaymentsActions = React.memo(() => {
  const { t } = useTranslation();
  const { user } = useAppSelector(selectAuth);

  return (
    <Box
      component={Paper}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column' },
        alignItems: 'center',
        gap: '10px',
        margin: '10px auto',
        padding: '15px',
        maxWidth: 300,
      }}
    >
      <Typography variant="h5" component="h3" textAlign="center">
        {t('profile.balance', { ns: NAME_SPACES.main, balance: user?.balance || 0 })}
      </Typography>

      {user && user.balance > 0 && <WithdrawalModal user={user} />}

      {user && <AccountReplenishmentBlock user={user} />}
    </Box>
  );
});
