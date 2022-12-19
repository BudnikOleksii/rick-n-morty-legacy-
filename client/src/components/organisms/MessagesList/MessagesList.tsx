import React, { FC, useEffect, useRef } from 'react';
import { IMessage } from '../../../types/chat-messages';
import { MessageItem } from '../../molecules/MessageItem';
import List from '@mui/material/List';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectMessages } from '../../../features/messages/messages-selectors';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { messagesLoadingStart } from '../../../features/messages/messages-slice';
import { useParams } from 'react-router-dom';

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
  }, []);

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
        height: '60vh',
        overflowY: 'auto',
      }}
      onScroll={scrollHandler}
    >
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </List>
  );
};
