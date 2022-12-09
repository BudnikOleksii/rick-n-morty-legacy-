import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { lotsLoadingStart, lotsRemoveErrors } from '../features/lots/lots-slice';
import { selectLots } from '../features/lots/lots-selectors';
import { PATHS } from '../constants';
import { PageTemplate } from '../components/templates/PageTemplate';

const Lots = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { lots, lotsInfo, lotsErrors, lotsIsloading } = useAppSelector(selectLots);

  const handleCloseNotification = () => dispatch(lotsRemoveErrors());
  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.lots}?page=${pageNumber}`);
  };

  useEffect(() => {
    dispatch(
      lotsLoadingStart({
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  return (
    <PageTemplate
      title="Auction"
      isLoading={lotsIsloading}
      errors={lotsErrors}
      onCloseNotification={handleCloseNotification}
      info={lotsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      LOTS
    </PageTemplate>
  );
};

export default Lots;
