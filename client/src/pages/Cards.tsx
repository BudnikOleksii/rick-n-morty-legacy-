import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCards } from '../features/cards/cards-selectors';
import { cardsLoadingStart, cardsRemoveErrors } from '../features/cards/cards-slice';
import { selectAuth } from '../features/auth/auth-selectors';
import { PATHS } from '../constants';
import { CardsList } from '../components/organisms/CardsList';
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from '../components/templates/PageTemplate';

const Cards = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
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
  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.cards}?page=${pageNumber}`);
  };

  return (
    <PageTemplate
      title="Your cards"
      isLoading={cardsIsloading}
      errors={cardsErrors}
      onCloseNotification={handleCloseNotification}
      info={cardsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {cards && cards.length > 0 && <CardsList cards={cards} />}
      {cards && cards.length === 0 && <h2>You don't have any cards yet:( Go to auction</h2>}
    </PageTemplate>
  );
};

export default Cards;
