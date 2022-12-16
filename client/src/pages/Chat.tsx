import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { messagesLoadingStart } from '../features/messages/messages-slice';
import { selectMessages } from '../features/messages/messages-selectors';
import { selectAuth } from '../features/auth/auth-selectors';
import { MessageItem } from '../components/molecules/MessageItem';
import { ChatUsersInfo } from '../components/organisms/ChatUsersInfo';
import { NewMessageForm } from '../components/organisms/NewMessageForm';
import { startChannel, stopChannel } from '../features/chat-socket/chat-socket-slice';

const Chat = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { chat, messages } = useAppSelector(selectMessages);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(registerAction(messagesLoadingStart.type));
    dispatch(
      messagesLoadingStart({
        id,
        params: `?page=${page}`,
      })
    );
    dispatch(
      startChannel({
        roomId: Number(id),
      })
    );

    return () => {
      dispatch(stopChannel());
    };
  }, [page]);

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
          {messages && messages.length > 0 && (
            <List
              sx={{
                height: '60vh',
                overflowY: 'auto',
              }}
            >
              {messages.map((msg) => (
                <MessageItem key={msg.id} message={msg} />
              ))}
            </List>
          )}

          <Divider />

          <NewMessageForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
