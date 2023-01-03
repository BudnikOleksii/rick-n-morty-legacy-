import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Modal from '@mui/material/Modal';
import { IUser } from '../../../types/user';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { modalStyles } from '../../../modal-styles';
import { NAME_SPACES } from '../../../constants';

interface Props {
  users: Omit<IUser, 'roles'>[];
  open: boolean;
  onOpen: (open: boolean) => void;
}

export const UsersInChatModal: FC<Props> = ({ users, open, onOpen }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={() => onOpen(false)}
      aria-labelledby="modal-users"
      aria-describedby="modal-users-list-for-current-chat"
    >
      <Box sx={modalStyles}>
        {users.length > 0 ? (
          <List>
            {users.map((user) => (
              <ListItemComponent
                key={user.id}
                name={t('chats.username', { ns: NAME_SPACES.pages })}
                value={user.username}
                icon={<PersonIcon />}
              />
            ))}
          </List>
        ) : (
          <Typography>{t('chats.no_users', { ns: NAME_SPACES.pages })}</Typography>
        )}
      </Box>
    </Modal>
  );
};
