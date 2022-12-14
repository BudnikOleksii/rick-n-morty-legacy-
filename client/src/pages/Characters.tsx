import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PATHS } from '../constants';
import { selectCharacters } from '../features/characters/characters-selectors';
import { charactersLoadingStart } from '../features/characters/characters-slice';
import { CharactersList } from '../components/organisms/CharactersList';
import { useNavigate } from 'react-router-dom';
import { setsLoadingStart } from '../features/sets/sets-slice';
import { PageTemplate } from '../components/templates/PageTemplate';
import { registerAction } from '../features/notification-info/notification-info-slice';

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
        <h2>You don't have any cards yet:( Go to auction</h2>
      )}
    </PageTemplate>
  );
};

export default Characters;
