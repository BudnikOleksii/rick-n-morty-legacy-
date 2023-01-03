import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Typography from '@mui/material/Typography';
import { PageTemplate } from '../components/templates/PageTemplate';
import { SetsList } from '../components/organisms/SetsList/SetsList';
import { SetFormModal } from '../components/organisms/SetFormModal';
import { setsLoadingStart } from '../features/sets/sets-slice';
import { selectSets } from '../features/sets/sets-selcetors';
import { selectAuth } from '../features/auth/auth-selectors';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { NAME_SPACES, PATHS } from '../constants';

const Sets = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { sets, setsInfo } = useAppSelector(selectSets);
  const { isAdmin } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(registerAction(setsLoadingStart.type));
    dispatch(
      setsLoadingStart({
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.sets}?page=${pageNumber}`);
  };

  return (
    <PageTemplate
      title={t('sets.title', { ns: NAME_SPACES.pages })}
      info={setsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {isAdmin && <SetFormModal />}

      {sets && sets.length > 0 && <SetsList sets={sets} />}

      {sets && sets.length === 0 && (
        <Typography variant="h5">{t('sets.not_found', { ns: NAME_SPACES.pages })}</Typography>
      )}
    </PageTemplate>
  );
};

export default Sets;
