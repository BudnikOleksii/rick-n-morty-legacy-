import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setLoadingStart } from '../features/sets/sets-slice';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { selectSets } from '../features/sets/sets-selcetors';
import { CharactersList } from '../components/organisms/CharactersList';
import { ContentContainer } from '../components/layouts/ContentContainer';
import { Heading } from '../components/molecules/Heading';
import { selectIsActionInProcess } from '../features/actions-info/actions-info-selector';
import NotFoundPage from './NotFound';

const Set = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedSet } = useAppSelector(selectSets);
  const isLoading = useAppSelector(selectIsActionInProcess(setLoadingStart.type));

  useEffect(() => {
    dispatch(registerAction(setLoadingStart.type));
    dispatch(setLoadingStart({ id }));
  }, []);

  return (
    <ContentContainer>
      {selectedSet && !isLoading && (
        <>
          <Heading title={selectedSet.name} />
          <CharactersList characters={selectedSet.characters} />
        </>
      )}

      {!isLoading && !selectedSet && <NotFoundPage />}
    </ContentContainer>
  );
};

export default Set;
