import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { lotsLoadingStart } from '../features/lots/lots-slice';
import { selectLots } from '../features/lots/lots-selectors';
import { PATHS } from '../constants';
import { PageTemplate } from '../components/templates/PageTemplate';
import { startLoading } from '../features/notification-info/notification-info-slice';
import { LotsList } from '../components/organisms/LotsList';

const Lots = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { lots, lotsInfo } = useAppSelector(selectLots);
  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.lots}?page=${pageNumber}`);
  };

  // TODO Add filters and send request with filter params

  useEffect(() => {
    dispatch(startLoading());
    dispatch(
      lotsLoadingStart({
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  return (
    <PageTemplate
      title="Auction"
      info={lotsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {lots && lots.length > 0 && <LotsList lots={lots} />}
    </PageTemplate>
  );
};

export default Lots;
