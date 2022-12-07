import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Pagination from '@mui/material/Pagination';
import { PATHS } from '../constants';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setsLoadingStart, setsRemoveErrors } from '../features/sets/sets-slice';
import { selectSets } from '../features/sets/sets-selcetors';
import { NotificationBlock } from '../components/NotificationBlock';
import { CharactersList } from '../components/CharactersList';
import { Heading } from '../components/Heading';
import { SetBlock } from '../components/SetBlock';

const Sets = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sets, setsInfo, setsIsloading, setsErrors } = useAppSelector(selectSets);

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
            navigate(`${PATHS.cards}?page=${pageNumber}`);
          }}
        />
      )}
    </Box>
  );
};

export default Sets;
