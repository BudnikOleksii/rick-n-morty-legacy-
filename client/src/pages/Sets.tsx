import React, { useEffect } from 'react';
import { PATHS } from '../constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setsLoadingStart } from '../features/sets/sets-slice';
import { selectSets } from '../features/sets/sets-selcetors';
import { SetBlock } from '../components/organisms/SetBlock';
import { selectAuth } from '../features/auth/auth-selectors';
import { BaseModal } from '../components/molecules/BaseModal';
import { SetForm } from '../components/organisms/SetForm';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { PageTemplate } from '../components/templates/PageTemplate';
import { registerAction } from '../features/notification-info/notification-info-slice';

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
      {isAdmin && (
        <BaseModal openModalTitle="Create Set" buttonVariant="contained">
          <Typography component="h1" variant="h5" textAlign="center">
            Create new set
          </Typography>
          <SetForm />
        </BaseModal>
      )}

      {sets && sets.length > 0 && sets.map((set) => <SetBlock key={set.id} set={set} />)}

      {sets && sets.length === 0 && <h2>There are no sets</h2>}
    </PageTemplate>
  );
};

export default Sets;
