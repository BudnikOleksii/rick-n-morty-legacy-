import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { ConfirmButton } from '../../atoms/ConfirmButton';
import { BaseModal } from '../../molecules/BaseModal';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { withdrawalStart } from '../../../features/transactions/transactions-slice';
import { useAppDispatch } from '../../../app/hooks';
import { IUser } from '../../../types/user';
import { NAME_SPACES, SYSTEM_FEE } from '../../../constants';

interface Props {
  user: IUser;
}

export const WithdrawalModal: FC<Props> = React.memo(({ user }) => {
  const { balance, id } = user;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  const onWithdraw = () => {
    dispatch(registerAction(withdrawalStart.type));
    dispatch(
      withdrawalStart({
        userId: id,
        amount: balance,
      })
    );

    setOpenWithdrawModal(false);
  };

  return (
    <BaseModal
      openModalTitle={t(`payments.withdraw.btn`, { ns: NAME_SPACES.pages })}
      open={openWithdrawModal}
      onOpenChange={setOpenWithdrawModal}
    >
      <Typography>
        {t(`payments.withdraw.text`, { ns: NAME_SPACES.pages, balance, fee: SYSTEM_FEE * 100 })}
      </Typography>
      <ConfirmButton onConfirm={onWithdraw} />
    </BaseModal>
  );
});
