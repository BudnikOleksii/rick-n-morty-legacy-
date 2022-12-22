import StripeCheckout, { Token } from 'react-stripe-checkout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { replenishBalanceStart } from '../../../features/transactions/transactions-slice';
import { CARDS_POINTS_RATE } from '../../../constants';
import Typography from '@mui/material/Typography';

const AMOUNT_INCREMENT = 100;
const MIN_AMOUNT_FOR_PURCHASE = AMOUNT_INCREMENT;
const MAX_AMOUNT_FOR_PURCHASE = AMOUNT_INCREMENT * 100;

export const PaymentsActions = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const [cardsPointsAmount, setCardsPointsAmount] = useState(AMOUNT_INCREMENT);
  const amount = cardsPointsAmount * CARDS_POINTS_RATE;
  console.log(user);

  const onToken = async (token: Token) => {
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

  const handleCardsPointsAmount = (value: number) => {
    const newAmount = cardsPointsAmount + value;

    if (newAmount < MIN_AMOUNT_FOR_PURCHASE || newAmount > MAX_AMOUNT_FOR_PURCHASE) {
      return;
    }

    setCardsPointsAmount((prev) => prev + value);
  };

  return (
    <Box>
      <Typography variant="h4" component="h3" textAlign="center">
        {`Current balance: ${user?.balance || 0}`}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '15px',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '5px',
            minWidth: 200,
          }}
        >
          <Button
            size="small"
            disableElevation
            variant="contained"
            disabled={cardsPointsAmount <= MIN_AMOUNT_FOR_PURCHASE}
            onClick={() => handleCardsPointsAmount(-AMOUNT_INCREMENT)}
          >
            -
          </Button>

          <p>{cardsPointsAmount}</p>

          <Button
            size="small"
            disableElevation
            variant="contained"
            disabled={cardsPointsAmount >= MAX_AMOUNT_FOR_PURCHASE}
            onClick={() => handleCardsPointsAmount(+AMOUNT_INCREMENT)}
          >
            +
          </Button>
        </Box>

        <StripeCheckout
          token={onToken}
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string}
          amount={amount}
          billingAddress
          label="Buy cards points"
        />
      </Box>
    </Box>
  );
};
