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
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

const Sets = () => {
  const navigate = useNavigate();
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
          <Typography component="h1" variant="h5" textAlign="center">
            Create new set
          </Typography>
          <SetForm />
        </BaseModal>
      )}

      <Heading title="Sets" />

      {sets && sets.length > 0 && sets.map((set) => <SetBlock key={set.id} set={set} />)}

      {sets && sets.length === 0 && <h2>There are no sets</h2>}

      {setsInfo && setsInfo.total > 0 && (
        <Pagination
          sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
          count={setsInfo.pages}
          variant="outlined"
          shape="rounded"
          page={Number(page) || 1}
          onChange={(_, pageNumber) => {
            navigate(`${PATHS.sets}?page=${pageNumber}`);
          }}
        />
      )}
    </Box>
  );
};

export default Sets;
