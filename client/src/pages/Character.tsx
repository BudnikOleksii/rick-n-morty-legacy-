import React, { useEffect } from 'react';
import { ContentContainer } from '../components/layouts/ContentContainer';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectIsActionInProcess } from '../features/actions-info/actions-info-selector';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { characterLoadingStart } from '../features/characters/characters-slice';
import { selectCharacters } from '../features/characters/characters-selectors';
import NotFoundPage from './NotFound';
import { Heading } from '../components/molecules/Heading';
import { CharacterDetails } from '../components/organisms/CharacterDetails';

const Character = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedCharacter } = useAppSelector(selectCharacters);
  const isLoading = useAppSelector(selectIsActionInProcess(characterLoadingStart.type));

  useEffect(() => {
    dispatch(registerAction(characterLoadingStart.type));
    dispatch(characterLoadingStart({ id }));
  }, []);

  return (
    <ContentContainer>
      {selectedCharacter && !isLoading && (
        <>
          <Heading title={selectedCharacter.name} />
          <CharacterDetails character={selectedCharacter} />
        </>
      )}

      {!isLoading && !selectedCharacter && <NotFoundPage />}
    </ContentContainer>
  );
};

export default Character;
