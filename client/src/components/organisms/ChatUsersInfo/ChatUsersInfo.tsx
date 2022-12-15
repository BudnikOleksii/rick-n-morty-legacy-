import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { UserListItem } from '../../molecules/UserListItem';
import { ConfirmModal } from '../../molecules/ConfirmModal';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { selectMessages } from '../../../features/messages/messages-selectors';

export const ChatUsersInfo = () => {
  const { user } = useAppSelector(selectAuth);
  const { chat } = useAppSelector(selectMessages);
  const isUserInChat = chat?.users.some((userInChat) => userInChat.id === user?.id);
  const toggleChatMessage = isUserInChat ? 'Leave chat' : 'Join chat';

  const handleToggleUserInChat = () => {
    console.log(chat?.id);
  };

  return (
    <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
      {user && (
        <List>
          <UserListItem user={user}>
            <ConfirmModal
              buttonTitle={toggleChatMessage}
              confirmText={`${toggleChatMessage}, please, confirm`}
              onConfirm={handleToggleUserInChat}
            />
          </UserListItem>
        </List>
      )}

      <Divider />

      {chat && chat.users.length > 0 && (
        <List>
          {chat.users.map((chatUser) => (
            <UserListItem key={chatUser.id} user={chatUser} />
          ))}
        </List>
      )}
    </Grid>
  );
};
