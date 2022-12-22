import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PATHS } from '../constants';
import { PageTemplate } from '../components/templates/PageTemplate';
import { selectTransactions } from '../features/transactions/transactions-selectors';
import { transactionsLoadingStart } from '../features/transactions/transactions-slice';
import { selectAuth } from '../features/auth/auth-selectors';
import { TransactionsTable } from '../components/organisms/TransactionsTable';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { PaymentsActions } from '../components/organisms/PaymentsActions';

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
    dispatch(registerAction(transactionsLoadingStart.type));
    dispatch(
      transactionsLoadingStart({
        userId: user?.id || 0,
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  return (
    <PageTemplate
      title="Payments"
      info={transactionsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      <PaymentsActions />

      {transactions && transactions.length > 0 && <TransactionsTable transactions={transactions} />}
    </PageTemplate>
  );
};

export default Transactions;
