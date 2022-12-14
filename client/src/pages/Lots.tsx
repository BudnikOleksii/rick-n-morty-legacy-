import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { lotsLoadingStart } from '../features/lots/lots-slice';
import { selectLots } from '../features/lots/lots-selectors';
import { PATHS } from '../constants';
import { PageTemplate } from '../components/templates/PageTemplate';
import { LotsList } from '../components/organisms/LotsList';
import { LotsFilter } from '../components/organisms/LotsFilter';
import { registerAction } from '../features/notification-info/notification-info-slice';

const Lots = () => {
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
      title="Auction"
      info={lotsInfo}
      currentPage={Number(page)}
      onPageChange={handleQueryChange}
    >
      <LotsFilter setQuery={setQuery} />
      {lots && lots.length > 0 && <LotsList lots={lots} />}
    </PageTemplate>
  );
};

export default Lots;
