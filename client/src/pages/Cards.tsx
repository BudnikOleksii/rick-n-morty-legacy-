import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCards } from '../features/cards/cards-selectors';
import { cardsLoadingStart, cardsRemoveErrors } from '../features/cards/cards-slice';
import { selectAuth } from '../features/auth/auth-selectors';
import Grid from '@mui/material/Grid';
import { CharacterCard } from '../components/CharacterCard/CharacterCard';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../constants';

const Cards = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { cards, cardsInfo, cardsIsloading, cardsErrors } = useAppSelector(selectCards);

  useEffect(() => {
    if (user) {
      dispatch(
        cardsLoadingStart({
          userId: user.id,
          params: `?page=${page || 1}`,
        })
      );
    }
  }, [page]);

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
        <Grid container spacing={2}>
          {cards.map((card) => (
            <CharacterCard key={card.id} card={card} />
          ))}
        </Grid>
      )}

      {cardsInfo && (
        <Pagination
          sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
          count={cardsInfo.pages}
          variant="outlined"
          shape="rounded"
          page={Number(page) || 1}
          onChange={(_, pageNumber) => {
            navigate(`${PATHS.cards}?page=${pageNumber}`);
          }}
        />
      )}
    </Box>
  );
};

export default Cards;
