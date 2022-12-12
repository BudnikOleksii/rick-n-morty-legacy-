import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCards } from '../features/cards/cards-selectors';
import { cardsLoadingStart } from '../features/cards/cards-slice';
import { selectAuth } from '../features/auth/auth-selectors';
import { PATHS } from '../constants';
import { CardsList } from '../components/organisms/CardsList';
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from '../components/templates/PageTemplate';
import { startLoading } from '../features/notification-info/notification-info-slice';

const Cards = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { cards, cardsInfo } = useAppSelector(selectCards);

  useEffect(() => {
    if (user) {
      dispatch(startLoading());
      dispatch(
        cardsLoadingStart({
          userId: user.id,
          params: `?page=${page || 1}`,
        })
      );
    }
  }, [page]);

  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.cards}?page=${pageNumber}`);
  };

  return (
    <PageTemplate
      title="Your cards"
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
