import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import StarRateIcon from '@mui/icons-material/StarRate';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DnsIcon from '@mui/icons-material/Dns';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import { CardButtonsWrapper } from '../../atoms/CardButtonsWrapper';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { BaseModal } from '../../molecules/BaseModal';
import { ConfirmButton } from '../../atoms/ConfirmButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { addNewRoleStart } from '../../../features/users/users-slice';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { checkIsAdmin } from '../../../helpers/check-is-admin';
import { getLocalDate, getLocalTime } from '../../../helpers/date-helpers';
import { ADMIN_ROLE, PATHS } from '../../../constants';
import { IUser } from '../../../types/user';

type Props = {
  user: IUser;
};

export const UserCard: FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id, username, rating, roles, ip, registration_date, last_visit_date } = user;
  const { isAdmin } = useAppSelector(selectAuth);
  const [openAddNewRoleModal, setOpenAddNewRoleModal] = useState(false);
  const hasAdminRole = checkIsAdmin(roles);

  const handleAddNewRole = (role: string = ADMIN_ROLE) => {
    dispatch(registerAction(addNewRoleStart.type));
    dispatch(
      addNewRoleStart({
        id,
        role,
      })
    );
  };

  const handleNavigateToUserCards = () => {
    navigate(PATHS.userCards(id));
  };

  return (
    <Card
      sx={{
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {username}
        </Typography>

        <List>
          <ListItemComponent
            name={t('rating', { ns: 'user-card' })}
            value={rating}
            icon={<StarRateIcon />}
          />

          {roles.map((role) => (
            <ListItemComponent
              key={role.id}
              name={t('role', { ns: 'user-card' })}
              value={role.title}
              icon={<SupervisorAccountIcon />}
            />
          ))}

          <ListItemComponent name={t('ip', { ns: 'user-card' })} value={ip} icon={<DnsIcon />} />
          <ListItemComponent
            name={t('registration_date', { ns: 'user-card' })}
            value={getLocalDate(registration_date)}
            icon={<EventIcon />}
          />
          <ListItemComponent
            name={t('last_seen', { ns: 'user-card' })}
            value={getLocalTime(last_visit_date)}
            icon={<EventIcon />}
          />
        </List>
      </CardContent>

      <CardButtonsWrapper>
        {isAdmin && !hasAdminRole && (
          <BaseModal
            openModalTitle={t('add_role', { ns: 'user-card' })}
            open={openAddNewRoleModal}
            onOpenChange={setOpenAddNewRoleModal}
            styles={{ margin: 0 }}
          >
            {t('add_role_confirmation', { ns: 'user-card' })}
            <ConfirmButton onConfirm={() => handleAddNewRole()} />
          </BaseModal>
        )}

        <Button variant="contained" onClick={handleNavigateToUserCards}>
          {t('cards_link', { ns: 'user-card' })}
        </Button>
      </CardButtonsWrapper>
    </Card>
  );
};
