import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChatIcon from '@mui/icons-material/Chat';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { IChat } from '../../../types/chat-messages';
import { NAME_SPACES } from '../../../constants';
import { UsersInChatModal } from '../UsersInChatModal';

interface Props {
  chat: IChat;
}

export const ChatCard: FC<Props> = ({ chat }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, name, users } = chat;
  const [openUsersInChatModal, setOpenUsersInChatModal] = useState(false);

  const handleOpenChat = () => {
    navigate(String(id));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => setOpenUsersInChatModal(true)}>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>

        <ListItemText primary={name} />
      </ListItemButton>

      <Button onClick={handleOpenChat}>{t('buttons.open', { ns: NAME_SPACES.main })}</Button>

      <UsersInChatModal
        users={users}
        open={openUsersInChatModal}
        onOpen={setOpenUsersInChatModal}
      />
    </ListItem>
  );
};
