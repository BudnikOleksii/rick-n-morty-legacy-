import React, { FC, useEffect, useRef, useState } from 'react';
import { IMessage } from '../../../types/chat-messages';
import { MessageItem } from '../../molecules/MessageItem';
import List from '@mui/material/List';

interface Props {
  messages: IMessage[];
}

export const MessagesList: FC<Props> = ({ messages }) => {
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <List
      sx={{
        height: '60vh',
        overflowY: 'auto',
      }}
    >
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </List>
  );
};
