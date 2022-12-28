import React, { FC } from 'react';
import { IChat } from '../../../types/chat-messages';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface Props {
  chat: IChat;
}

export const ChatHeading: FC<Props> = ({ chat }) => (
  <Grid container>
    <Grid item xs={12}>
      <Typography variant="h5">{`Chat: ${chat.name}`}</Typography>
    </Grid>
  </Grid>
);
