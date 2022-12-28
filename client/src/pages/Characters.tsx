import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { PageTemplate } from '../components/templates/PageTemplate';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCharacters } from '../features/characters/characters-selectors';
import { charactersLoadingStart } from '../features/characters/characters-slice';
import { CharactersList } from '../components/organisms/CharactersList';
import { setsLoadingStart } from '../features/sets/sets-slice';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { PATHS } from '../constants';

const Characters = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { characters, charactersInfo } = useAppSelector(selectCharacters);

  useEffect(() => {
    dispatch(registerAction(charactersLoadingStart.type));
    dispatch(
      charactersLoadingStart({
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  useEffect(() => {
    dispatch(registerAction(setsLoadingStart.type));
    dispatch(
      setsLoadingStart({
        params: `/all`,
      })
    );
  }, []);

  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.characters}?page=${pageNumber}`);
  };

  return (
    <PageTemplate
      title="All characters"
      info={charactersInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {characters && characters.length > 0 && <CharactersList characters={characters} />}

      {characters && characters.length === 0 && (
        <Typography variant="h5">No characters found</Typography>
      )}
    </PageTemplate>
  );
};

export default Characters;
