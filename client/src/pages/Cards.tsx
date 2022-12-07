import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCards } from '../features/cards/cards-selectors';
import { cardsLoadingStart, cardsRemoveErrors } from '../features/cards/cards-slice';
import { selectAuth } from '../features/auth/auth-selectors';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../constants';
import { CardsList } from '../components/CardsList';
import { NotificationBlock } from '../components/NotificationBlock';
import { Heading } from '../components/Heading';

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
      <NotificationBlock
        isloading={cardsIsloading}
        errors={cardsErrors}
        onCloseNotification={handleCloseNotification}
      />

      <Heading title="Your cards" />

      {cards && cards.length > 0 && <CardsList cards={cards} />}

      {cards && cards.length === 0 && <h2>You don't have any cards yet:( Go to auction</h2>}

      {cardsInfo && cardsInfo.total > 0 && (
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
