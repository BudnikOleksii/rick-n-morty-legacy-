import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCards } from '../features/cards/cards-selectors';
import { registerAction } from '../features/notification-info/notification-info-slice';
import { cardsLoadingStart } from '../features/cards/cards-slice';
import { PATHS } from '../constants';
import { PageTemplate } from '../components/templates/PageTemplate';
import { CardsList } from '../components/organisms/CardsList';

const Cards = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { cards, cardsInfo } = useAppSelector(selectCards);

  useEffect(() => {
    dispatch(registerAction(cardsLoadingStart.type));
    dispatch(
      cardsLoadingStart({
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.cards}?page=${pageNumber}`);
  };

  return (
    <PageTemplate
      title="All cards"
      info={cardsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {cards && cards.length > 0 && <CardsList cards={cards} />}
      {cards && cards.length === 0 && <h2>No cards found</h2>}
    </PageTemplate>
  );
};

export default Cards;
