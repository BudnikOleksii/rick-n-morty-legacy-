import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { PageTemplate } from '../components/templates/PageTemplate';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCharacters } from '../features/characters/characters-selectors';
import { charactersLoadingStart } from '../features/characters/characters-slice';
import { CharactersList } from '../components/organisms/CharactersList';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { NAME_SPACES, PATHS } from '../constants';

const Characters = () => {
  const { t } = useTranslation();
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

  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.characters}?page=${pageNumber}`);
  };

  return (
    <PageTemplate
      title={t('characters.title', { ns: NAME_SPACES.pages })}
      info={charactersInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {characters && characters.length > 0 && <CharactersList characters={characters} />}

      {characters && characters.length === 0 && (
        <Typography variant="h5">{t('characters.not_found', { ns: NAME_SPACES.pages })}</Typography>
      )}
    </PageTemplate>
  );
};

export default Characters;
