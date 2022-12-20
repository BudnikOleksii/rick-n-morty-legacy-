import React, { FC } from 'react';
import List from '@mui/material/List';
import { IChat } from '../../../types/chat-messages';
import { ChatCard } from '../ChatCard';

interface Props {
  chats: IChat[];
}

export const ChatsList: FC<Props> = ({ chats }) => {
  return (
    <List sx={{ maxWidth: '400px', margin: '0 auto' }}>
      {chats.map((chat) => (
        <ChatCard key={chat.id} chat={chat} />
      ))}
    </List>
  );
};
