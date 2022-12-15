import React, { FC } from 'react';
import { IMessage } from '../../../types/chat-messages';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { getLocalTime } from '../../../helpers/date-helpers';
import { teal, indigo } from '@mui/material/colors';

const myMsgColor = teal[300];
const msgColor = indigo[300];

interface Props {
  message: IMessage;
}

export const MessageItem: FC<Props> = ({ message }) => {
  const { user: author, body, created_at } = message;
  const { user } = useAppSelector(selectAuth);
  const isUserAuthor = user?.id === author.id;

  return (
    <ListItem>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isUserAuthor ? 'flex-end' : 'flex-start',
          }}
        >
          <Box
            sx={{
              padding: '5px',
              borderRadius: '8px',
              bgcolor: isUserAuthor ? myMsgColor : msgColor,
            }}
          >
            <Avatar alt={author.username}>{author.username.slice(0, 2)}</Avatar>
            <ListItemText primary={body} />
            <ListItemText secondary={getLocalTime(created_at)} />
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
};
