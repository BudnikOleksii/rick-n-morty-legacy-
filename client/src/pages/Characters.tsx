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
import { useNavigate } from 'react-router-dom';
import { setsLoadingStart } from '../features/sets/sets-slice';
import { BasePagination } from '../components/molecules/BasePagination';

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
  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.characters}?page=${pageNumber}`);
  };

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
        <BasePagination
          pages={charactersInfo.pages}
          currentPage={Number(page)}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  );
};

export default Characters;
