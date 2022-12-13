import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PATHS } from '../constants';
import { startLoading } from '../features/notification-info/notification-info-slice';
import { PageTemplate } from '../components/templates/PageTemplate';
import { selectTransactions } from '../features/transactions/transactions-selectors';
import { transactionsLoadingStart } from '../features/transactions/transactions-slice';
import { selectAuth } from '../features/auth/auth-selectors';
import { TransactionsTable } from '../components/organisms/TransactionsTable';

const Transactions = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { transactions, transactionsInfo } = useAppSelector(selectTransactions);
  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.transactions}?page=${pageNumber}`);
  };

  useEffect(() => {
    dispatch(startLoading());
    dispatch(
      transactionsLoadingStart({
        userId: user?.id || 0,
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  return (
    <PageTemplate
      title="Transactions history"
      info={transactionsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {transactions && transactions.length > 0 && <TransactionsTable transactions={transactions} />}
    </PageTemplate>
  );
};

export default Transactions;
