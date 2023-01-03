import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Typography from '@mui/material/Typography';
import { PageTemplate } from '../components/templates/PageTemplate';
import { CardsList } from '../components/organisms/CardsList';
import { selectCards } from '../features/cards/cards-selectors';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { cardsLoadingStart } from '../features/cards/cards-slice';
import { NAME_SPACES, PATHS } from '../constants';

const Cards = () => {
  const { t } = useTranslation();
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
      title={t('all_cards.title', { ns: NAME_SPACES.pages })}
      info={cardsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {cards && cards.length > 0 && <CardsList cards={cards} />}
      {cards && cards.length === 0 && (
        <Typography variant="h5">{t('all_cards.not_found', { ns: NAME_SPACES.pages })}</Typography>
      )}
    </PageTemplate>
  );
};

export default Cards;
