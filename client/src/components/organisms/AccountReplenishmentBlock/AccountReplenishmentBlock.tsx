import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { CARDS_POINTS_RATE, STRIPE_CURRENCY } from '../../../constants';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { replenishBalanceStart } from '../../../features/transactions/transactions-slice';
import { useAppDispatch } from '../../../app/hooks';
import { IUser } from '../../../types/user';

interface Props {
  user: IUser;
}

const AMOUNT_INCREMENT = 100;
const MIN_AMOUNT_FOR_PURCHASE = AMOUNT_INCREMENT;
const MAX_AMOUNT_FOR_PURCHASE = AMOUNT_INCREMENT * 100;

export const AccountReplenishmentBlock: FC<Props> = React.memo(({ user }) => {
  const dispatch = useAppDispatch();
  const [cardsPointsAmount, setCardsPointsAmount] = useState(AMOUNT_INCREMENT);
  const amount = cardsPointsAmount * CARDS_POINTS_RATE;

  const onPayment = async (token: Token) => {
    dispatch(registerAction(replenishBalanceStart.type));
    dispatch(
      replenishBalanceStart({
        userId: user.id,
        amount,
        token,
      })
    );
  };

  const handleCardsPointsAmount = (value: number) => {
    const newAmount = cardsPointsAmount + value;

    if (newAmount < MIN_AMOUNT_FOR_PURCHASE || newAmount > MAX_AMOUNT_FOR_PURCHASE) {
      return;
    }

    setCardsPointsAmount((prev) => prev + value);
  };
  return (
    <>
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
    </>
  );
});
