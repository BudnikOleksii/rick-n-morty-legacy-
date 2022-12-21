import React, { useState } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { BaseModal } from '../../molecules/BaseModal';
import { ConfirmButton } from '../../atoms/ConfirmButton';
import { UserListItem } from '../../molecules/UserListItem';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { selectMessages } from '../../../features/messages/messages-selectors';
import { toggleUserInChatStart } from '../../../features/chats/chats-slice';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { selectSocket } from '../../../features/chat-socket/chat-socket-selectors';

export const ChatUsersInfo = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { chat } = useAppSelector(selectMessages);
  const { isOnline, usersInRoomIds } = useAppSelector(selectSocket);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const isUserInChat = chat?.users.some((userInChat) => userInChat.id === user?.id);
  const toggleChatMessage = isUserInChat ? 'Leave chat' : 'Join chat';

  const handleToggleUserInChat = () => {
    if (user && chat) {
      dispatch(registerAction(toggleUserInChatStart.type));
      dispatch(
        toggleUserInChatStart({
          chatId: chat.id,
          userId: user.id,
        })
      );

      setOpenConfirmModal(false);
    }
  };

  return (
    <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
      {user && (
        <List>
          <UserListItem isOnline={isOnline} user={user}>
            <BaseModal
              openModalTitle={toggleChatMessage}
              open={openConfirmModal}
              onOpenChange={setOpenConfirmModal}
              buttonVariant="contained"
            >
              {`${toggleChatMessage}, please, confirm`}
              <ConfirmButton onConfirm={handleToggleUserInChat} />
            </BaseModal>
          </UserListItem>
        </List>
      )}

      <Divider />

      {chat && chat.users.length > 0 && (
        <List>
          {chat.users.map((chatUser) => (
            <UserListItem
              key={chatUser.id}
              user={chatUser}
              isOnline={usersInRoomIds.includes(chatUser.id)}
            />
          ))}
        </List>
      )}
    </Grid>
  );
};
