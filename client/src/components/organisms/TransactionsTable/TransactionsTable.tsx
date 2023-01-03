import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { orange, lightGreen, indigo } from '@mui/material/colors';
import { ITransaction } from '../../../types/transaction';
import { getLocalTime } from '../../../helpers/date-helpers';
import { NAME_SPACES } from '../../../constants';
import { useTranslation } from 'react-i18next';

const colorCredit = orange[400];
const colorDebit = lightGreen[500];
interface Props {
  transactions: ITransaction[];
}

export const TransactionsTable: FC<Props> = ({ transactions }) => {
  const { t } = useTranslation();
  const { user } = useAppSelector(selectAuth);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Transactions table">
        <TableHead>
          <TableRow sx={{ backgroundColor: indigo[300] }}>
            <TableCell>{t(`payments.table.transaction_id`, { ns: NAME_SPACES.pages })}</TableCell>
            <TableCell align="center">
              {t('payments.table.lot_id', { ns: NAME_SPACES.pages })}
            </TableCell>
            <TableCell align="center">
              {t('payments.table.amount', { ns: NAME_SPACES.pages })}
            </TableCell>
            <TableCell align="center">
              {t(`payments.table.system_fee`, { ns: NAME_SPACES.pages })}
            </TableCell>
            <TableCell align="center">
              {t(`payments.table.seller`, { ns: NAME_SPACES.pages })}
            </TableCell>
            <TableCell align="center">
              {t(`payments.table.purchaser`, { ns: NAME_SPACES.pages })}
            </TableCell>
            <TableCell align="center">
              {t(`payments.table.transaction_date`, { ns: NAME_SPACES.pages })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tran) => (
            <TableRow
              hover
              key={tran.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: tran.seller_id === user?.id ? colorDebit : colorCredit,
              }}
            >
              <TableCell component="th" scope="row">
                {tran.id}
              </TableCell>
              <TableCell align="center">{tran.lot_id}</TableCell>
              <TableCell align="center">{tran.amount}</TableCell>
              <TableCell align="center">{tran.system_fee}</TableCell>
              <TableCell align="center">{tran.seller_id}</TableCell>
              <TableCell align="center">{tran.purchaser_id}</TableCell>
              <TableCell align="center">{getLocalTime(tran.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
