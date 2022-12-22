import React, { FC } from 'react';
import { IChat } from '../../../types/chat-messages';
import { UserListItem } from '../../molecules/UserListItem';
import List from '@mui/material/List';
import { useAppSelector } from '../../../app/hooks';
import { selectSocket } from '../../../features/chat-socket/chat-socket-selectors';

interface Props {
  chat: IChat;
}

export const ChatUsersList: FC<Props> = ({ chat }) => {
  const { usersInRoomIds } = useAppSelector(selectSocket);

  return (
    <List>
      {chat.users.map((chatUser) => (
        <UserListItem
          key={chatUser.id}
          user={chatUser}
          isOnline={usersInRoomIds.includes(chatUser.id)}
        />
      ))}
    </List>
  );
};
