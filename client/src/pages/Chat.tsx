import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { messagesLoadingStart } from '../features/messages/messages-slice';
import { selectMessages } from '../features/messages/messages-selectors';
import { startChannel, stopChannel } from '../features/chat-socket/chat-socket-slice';
import { ContentContainer } from '../components/layouts/ContentContainer';
import { selectIsActionInProcess } from '../features/actions-info/actions-info-selector';
import { ChatContent } from '../components/organisms/ChatContent';
import { ChatHeading } from '../components/atoms/ChatHeading';
import NotFoundPage from './NotFound';

const Chat = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { chat, messages } = useAppSelector(selectMessages);
  const isLoading = useAppSelector(selectIsActionInProcess(messagesLoadingStart.type));

  useEffect(() => {
    dispatch(registerAction(messagesLoadingStart.type));
    dispatch(
      messagesLoadingStart({
        id,
        params: '',
      })
    );
    dispatch(startChannel(Number(id)));

    return () => {
      dispatch(stopChannel());
    };
  }, []);

  return (
    <ContentContainer>
      {!isLoading && chat && messages && (
        <>
          <ChatHeading chat={chat} />
          <ChatContent messages={messages} />
        </>
      )}

      {!isLoading && (!chat || !messages) && <NotFoundPage />}
    </ContentContainer>
  );
};

export default Chat;
