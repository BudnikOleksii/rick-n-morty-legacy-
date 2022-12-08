import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { PATHS } from '../constants';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setsLoadingStart, setsRemoveErrors } from '../features/sets/sets-slice';
import { selectSets } from '../features/sets/sets-selcetors';
import { NotificationBlock } from '../components/organisms/NotificationBlock';
import { Heading } from '../components/molecules/Heading';
import { SetBlock } from '../components/organisms/SetBlock';
import { selectAuth } from '../features/auth/auth-selectors';
import { BaseModal } from '../components/molecules/BaseModal';
import { SetForm } from '../components/organisms/SetForm';
import { BasePagination } from '../components/molecules/BasePagination';

const Sets = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { sets, setsInfo, setsIsloading, setsErrors } = useAppSelector(selectSets);
  const { isAdmin } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(
      setsLoadingStart({
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  const handleCloseNotification = () => dispatch(setsRemoveErrors());

  return (
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Toolbar />
      <NotificationBlock
        isloading={setsIsloading}
        errors={setsErrors}
        onCloseNotification={handleCloseNotification}
      />

      {isAdmin && (
        <BaseModal openModalTitle="Create Set" buttonVariant="contained">
          <SetForm />
        </BaseModal>
      )}

      <Heading title="Sets" />

      {sets && sets.length > 0 && sets.map((set) => <SetBlock key={set.id} set={set} />)}

      {sets && sets.length === 0 && <h2>There are no sets</h2>}

      {setsInfo && setsInfo.total > 0 && (
        <BasePagination
          pages={setsInfo.pages}
          currentPage={Number(page)}
          baseEndpoint={PATHS.cards}
        />
      )}
    </Box>
  );
};

export default Sets;
