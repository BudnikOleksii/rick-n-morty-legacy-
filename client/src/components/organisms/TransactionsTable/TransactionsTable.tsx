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

const colorCredit = orange[400];
const colorDebit = lightGreen[500];
interface Props {
  transactions: ITransaction[];
}

export const TransactionsTable: FC<Props> = ({ transactions }) => {
  const { user } = useAppSelector(selectAuth);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: indigo[300] }}>
            <TableCell>Transaction ID</TableCell>
            <TableCell align="center">Lot ID</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">System fee</TableCell>
            <TableCell align="center">Seller</TableCell>
            <TableCell align="center">Purchaser</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
