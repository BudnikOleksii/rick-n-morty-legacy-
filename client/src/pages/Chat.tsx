import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { MessagesList } from '../components/organisms/MessagesList';
import { ChatUsersInfo } from '../components/organisms/ChatUsersInfo';
import { NewMessageForm } from '../components/organisms/NewMessageForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { messagesLoadingStart } from '../features/messages/messages-slice';
import { selectMessages } from '../features/messages/messages-selectors';
import { startChannel, stopChannel } from '../features/chat-socket/chat-socket-slice';

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
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Toolbar />

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
          height: '80vh',
        }}
      >
        <ChatUsersInfo />

        <Grid item xs={9}>
          {messages.length > 0 && <MessagesList messages={messages} />}

          <Divider />

          <NewMessageForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
