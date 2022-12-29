import React, { useEffect } from 'react';
import { PATHS } from '../constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setsLoadingStart } from '../features/sets/sets-slice';
import { selectSets } from '../features/sets/sets-selcetors';
import { selectAuth } from '../features/auth/auth-selectors';
import { SetFormModal } from '../components/organisms/SetFormModal';
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from '../components/templates/PageTemplate';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { SetsList } from '../components/organisms/SetsList/SetsList';
import Typography from '@mui/material/Typography';

const Sets = () => {
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
      title="Sets"
      info={setsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {isAdmin && <SetFormModal />}

      {sets && sets.length > 0 && <SetsList sets={sets} />}

      {sets && sets.length === 0 && <Typography variant="h5">There are no sets</Typography>}
    </PageTemplate>
  );
};

export default Sets;
