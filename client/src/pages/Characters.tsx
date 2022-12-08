import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { NotificationBlock } from '../components/organisms/NotificationBlock';
import { Heading } from '../components/molecules/Heading';
import { PATHS } from '../constants';
import { selectCharacters } from '../features/characters/characters-selectors';
import {
  charactersLoadingStart,
  charactersRemoveErrors,
} from '../features/characters/characters-slice';
import { CharactersList } from '../components/organisms/CharactersList';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import { setsLoadingStart } from '../features/sets/sets-slice';

const Characters = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { characters, charactersInfo, charactersIsloading, charactersErrors } =
    useAppSelector(selectCharacters);

  useEffect(() => {
    dispatch(
      charactersLoadingStart({
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  useEffect(() => {
    dispatch(
      setsLoadingStart({
        params: `/all`,
      })
    );
  }, []);

  const handleCloseNotification = () => dispatch(charactersRemoveErrors());

  return (
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Toolbar />
      <NotificationBlock
        isloading={charactersIsloading}
        errors={charactersErrors}
        onCloseNotification={handleCloseNotification}
      />

      <Heading title="All characters" />

      {characters && characters.length > 0 && <CharactersList characters={characters} />}

      {characters && characters.length === 0 && (
        <h2>You don't have any cards yet:( Go to auction</h2>
      )}

      {charactersInfo && charactersInfo.total > 0 && (
        <Pagination
          sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
          count={charactersInfo.pages}
          variant="outlined"
          shape="rounded"
          page={Number(page) || 1}
          onChange={(_, pageNumber) => {
            navigate(`${PATHS.characters}?page=${pageNumber}`);
          }}
        />
      )}
    </Box>
  );
};

export default Characters;
