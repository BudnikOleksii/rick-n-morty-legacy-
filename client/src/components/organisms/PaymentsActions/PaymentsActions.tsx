import StripeCheckout, { Token } from 'react-stripe-checkout';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import {
  replenishBalanceStart,
  withdrawalStart,
} from '../../../features/transactions/transactions-slice';
import { CARDS_POINTS_RATE, STRIPE_CURRENCY } from '../../../constants';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import { BaseModal } from '../../molecules/BaseModal';
import { ConfirmButton } from '../../atoms/ConfirmButton';

const AMOUNT_INCREMENT = 100;
const MIN_AMOUNT_FOR_PURCHASE = AMOUNT_INCREMENT;
const MAX_AMOUNT_FOR_PURCHASE = AMOUNT_INCREMENT * 100;

export const PaymentsActions = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const [cardsPointsAmount, setCardsPointsAmount] = useState(AMOUNT_INCREMENT);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const amount = cardsPointsAmount * CARDS_POINTS_RATE;

  const onPayment = async (token: Token) => {
    if (user) {
      dispatch(registerAction(replenishBalanceStart.type));
      dispatch(
        replenishBalanceStart({
          userId: user.id,
          amount,
          token,
        })
      );
    }
  };

  const onWithdraw = () => {
    if (user) {
      dispatch(registerAction(withdrawalStart.type));
      dispatch(
        withdrawalStart({
          userId: user.id,
          amount: user.balance,
        })
      );
    }

    setOpenWithdrawModal(false);
  };

  const handleCardsPointsAmount = (value: number) => {
    const newAmount = cardsPointsAmount + value;

    if (newAmount < MIN_AMOUNT_FOR_PURCHASE || newAmount > MAX_AMOUNT_FOR_PURCHASE) {
      return;
    }

    setCardsPointsAmount((prev) => prev + value);
  };

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
        {`Current balance: ${user?.balance || 0}`}
      </Typography>

      {user && user.balance > 0 && (
        <BaseModal
          openModalTitle="Withdraw"
          open={openWithdrawModal}
          onOpenChange={setOpenWithdrawModal}
        >
          {`Withdraw ${user.balance}? 
          Please, be informed, we collect commission ${10}%`}
          <ConfirmButton onConfirm={onWithdraw} />
        </BaseModal>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: 200,
        }}
      >
        <IconButton
          size="large"
          color="primary"
          disabled={cardsPointsAmount <= MIN_AMOUNT_FOR_PURCHASE}
          onClick={() => handleCardsPointsAmount(-AMOUNT_INCREMENT)}
        >
          <RemoveIcon fontSize="large" />
        </IconButton>

        <p>{cardsPointsAmount}</p>

        <IconButton
          size="large"
          color="primary"
          disabled={cardsPointsAmount >= MAX_AMOUNT_FOR_PURCHASE}
          onClick={() => handleCardsPointsAmount(+AMOUNT_INCREMENT)}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Box>

      <StripeCheckout
        token={onPayment}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string}
        amount={amount}
        currency={STRIPE_CURRENCY}
        billingAddress
        label="Buy cards points"
      />
    </Box>
  );
};
