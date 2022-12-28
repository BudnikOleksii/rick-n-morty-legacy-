import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { MessagesList } from '../components/organisms/MessagesList';
import { ChatUsersInfo } from '../components/organisms/ChatUsersInfo';
import { NewMessageForm } from '../components/organisms/NewMessageForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { messagesLoadingStart } from '../features/messages/messages-slice';
import { selectMessages } from '../features/messages/messages-selectors';
import { startChannel, stopChannel } from '../features/chat-socket/chat-socket-slice';
import { ContentContainer } from '../components/layouts/ContentContainer';

const Chat = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { chat, messages } = useAppSelector(selectMessages);

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
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">{`Chat: ${chat?.name || ''}`}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        component={Paper}
        sx={{
          width: '100%',
          height: {
            sm: '80vh',
            lg: '70vh',
          },
        }}
      >
        <ChatUsersInfo />

        <Grid item xs={12} md={8} lg={9}>
          {messages.length > 0 && <MessagesList messages={messages} />}

          <Divider />

          <NewMessageForm />
        </Grid>
      </Grid>
    </ContentContainer>
  );
};

export default Chat;
