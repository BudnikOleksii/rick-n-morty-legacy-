import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { SocialMediaButtons } from '../components/organisms/SocialMediaButtons';
import { PageTemplate } from '../components/templates/PageTemplate';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCards } from '../features/cards/cards-selectors';
import { userCardsLoadingStart } from '../features/cards/cards-slice';
import { selectAuth } from '../features/auth/auth-selectors';
import { CardsList } from '../components/organisms/CardsList';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { PATHS } from '../constants';

const UserCards = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { cards, cardsInfo } = useAppSelector(selectCards);

  useEffect(() => {
    if (user) {
      dispatch(registerAction(userCardsLoadingStart.type));
      dispatch(
        userCardsLoadingStart({
          userId: id || user.id,
          params: `?page=${page || 1}`,
        })
      );
    }
  }, [page, id]);

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
      {cards && cards.length === 0 && <Typography variant="h5">No cards found</Typography>}

      {!id && cards && cards.length > 0 && <SocialMediaButtons />}
    </PageTemplate>
  );
};

export default UserCards;
