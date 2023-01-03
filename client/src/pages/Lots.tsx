import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Typography from '@mui/material/Typography';
import { PageTemplate } from '../components/templates/PageTemplate';
import { lotsLoadingStart } from '../features/lots/lots-slice';
import { selectLots } from '../features/lots/lots-selectors';
import { LotsList } from '../components/organisms/LotsList';
import { LotsFilter } from '../components/organisms/LotsFilter';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { NAME_SPACES, PATHS } from '../constants';

const Lots = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { lots, lotsInfo } = useAppSelector(selectLots);

  const [query, setQuery] = useState('');
  const handleQueryChange = (pageNumber: number) => {
    navigate(`${PATHS.lots}?page=${pageNumber}${query}`);
  };

  useEffect(() => {
    dispatch(registerAction(lotsLoadingStart.type));
    dispatch(
      lotsLoadingStart({
        params: `?page=${page || 1}${query}`,
      })
    );
  }, [page, query]);

  return (
    <PageTemplate
      title={t('lots.title', { ns: NAME_SPACES.pages })}
      info={lotsInfo}
      currentPage={Number(page)}
      onPageChange={handleQueryChange}
    >
      <LotsFilter setQuery={setQuery} />
      {lots && lots.length > 0 && <LotsList lots={lots} />}

      {lots && lots.length === 0 && (
        <Typography variant="h5">{t('lots.not_found', { ns: NAME_SPACES.pages })}</Typography>
      )}
    </PageTemplate>
  );
};

export default Lots;
