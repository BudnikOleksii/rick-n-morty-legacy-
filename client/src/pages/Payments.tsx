import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NAME_SPACES, PATHS } from '../constants';
import { PageTemplate } from '../components/templates/PageTemplate';
import { selectTransactions } from '../features/transactions/transactions-selectors';
import { transactionsLoadingStart } from '../features/transactions/transactions-slice';
import { selectAuth } from '../features/auth/auth-selectors';
import { TransactionsTable } from '../components/organisms/TransactionsTable';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { PaymentsActions } from '../components/organisms/PaymentsActions';
import { useTranslation } from 'react-i18next';

const Payments = () => {
  const { t } = useTranslation();
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
      title={t(`payments.title`, { ns: NAME_SPACES.pages })}
      info={transactionsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      <PaymentsActions />

      {transactions && transactions.length > 0 && <TransactionsTable transactions={transactions} />}
    </PageTemplate>
  );
};

export default Payments;
