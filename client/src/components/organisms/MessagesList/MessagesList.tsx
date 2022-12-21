import React, { FC, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { MessageItem } from '../../molecules/MessageItem';
import { IMessage } from '../../../types/chat-messages';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectMessages } from '../../../features/messages/messages-selectors';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { messagesLoadingStart } from '../../../features/messages/messages-slice';

interface Props {
  messages: IMessage[];
}

export const MessagesList: FC<Props> = ({ messages }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const { messagesInfo } = useAppSelector(selectMessages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollHandler = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
    if ((event.target as HTMLElement).scrollTop === 0 && messagesInfo?.next) {
      dispatch(registerAction(messagesLoadingStart.type));

      const params = `?${messagesInfo.next.split('?')[1]}`;
      dispatch(
        messagesLoadingStart({
          id,
          params,
        })
      );
    }
  };

  return (
    <List
      sx={{
        maxHeight: '55vh',
        overflowY: 'auto',
      }}
      onScroll={scrollHandler}
    >
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      <Box ref={bottomRef} />
    </List>
  );
};
