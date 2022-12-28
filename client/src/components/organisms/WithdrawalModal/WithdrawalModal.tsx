import React, { FC, useState } from 'react';
import { ConfirmButton } from '../../atoms/ConfirmButton';
import { BaseModal } from '../../molecules/BaseModal';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { withdrawalStart } from '../../../features/transactions/transactions-slice';
import { useAppDispatch } from '../../../app/hooks';
import { IUser } from '../../../types/user';
import { SYSTEM_FEE } from '../../../constants';
import Typography from '@mui/material/Typography';

interface Props {
  user: IUser;
}

export const WithdrawalModal: FC<Props> = React.memo(({ user }) => {
  const dispatch = useAppDispatch();
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  const onWithdraw = () => {
    dispatch(registerAction(withdrawalStart.type));
    dispatch(
      withdrawalStart({
        userId: user.id,
        amount: user.balance,
      })
    );

    setOpenWithdrawModal(false);
  };

  return (
    <BaseModal
      openModalTitle="Withdraw"
      open={openWithdrawModal}
      onOpenChange={setOpenWithdrawModal}
    >
      <Typography>
        {`Withdraw ${user.balance}? Please, be informed, we collect commission ${
          SYSTEM_FEE * 100
        }%`}
      </Typography>
      <ConfirmButton onConfirm={onWithdraw} />
    </BaseModal>
  );
});
