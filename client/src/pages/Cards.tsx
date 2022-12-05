import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import { Card, CardActions, CardContent, CardMedia, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCards } from '../features/cards/cards-selectors';
import { cardsLoadingStart, cardsRemoveErrors } from '../features/cards/cards-slice';
import { selectAuth } from '../features/auth/auth-selectors';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CharacterCard } from '../components/CharacterCard/CharacterCard';

const Cards = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { cards, cardsInfo, cardsIsloading, cardsErrors } = useAppSelector(selectCards);

  useEffect(() => {
    if (user) {
      dispatch(cardsLoadingStart(user.id));
    }
  }, []);

  const handleCloseNotification = () => dispatch(cardsRemoveErrors());

  return (
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Toolbar />
      {cardsIsloading && <LinearProgress />}
      {cardsErrors && (
        <Snackbar open={!!cardsErrors} autoHideDuration={3000} onClose={handleCloseNotification}>
          <Alert onClose={handleCloseNotification} severity="error" sx={{ width: '100%' }}>
            {cardsErrors}
          </Alert>
        </Snackbar>
      )}

      {cards && (
        <Grid container spacing={2} justifyContent="space-between">
          {cards.map((card) => (
            <CharacterCard key={card.id} card={card} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Cards;
