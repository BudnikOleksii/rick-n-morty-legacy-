import React, { FC } from 'react';
import Paper from '@mui/material/Paper';
import { ChatUsersInfo } from '../ChatUsersInfo';
import Grid from '@mui/material/Grid';
import { MessagesList } from '../MessagesList';
import Divider from '@mui/material/Divider';
import { NewMessageForm } from '../NewMessageForm';
import { IMessage } from '../../../types/chat-messages';

interface Props {
  messages: IMessage[];
}

export const ChatContent: FC<Props> = ({ messages }) => {
  return (
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
  );
};
