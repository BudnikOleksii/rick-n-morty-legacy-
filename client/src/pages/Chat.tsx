import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { messagesLoadingStart } from '../features/messages/messages-slice';
import { selectMessages } from '../features/messages/messages-selectors';
import { selectAuth } from '../features/auth/auth-selectors';
import { UserListItem } from '../components/molecules/UserListItem';
import { ConfirmModal } from '../components/molecules/ConfirmModal';
import { getLocalTime } from '../helpers/date-helpers';
import { MessageItem } from '../components/molecules/MessageItem';

const styles = {
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
};

const Chat = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { chat, messages, messagesInfo } = useAppSelector(selectMessages);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(registerAction(messagesLoadingStart.type));
    dispatch(
      messagesLoadingStart({
        id,
        params: `?page=${page}`,
      })
    );
  }, [page]);

  const isUserInChat = chat?.users.some((userInChat) => userInChat.id === user?.id);
  const toggleChatMessage = isUserInChat ? 'Leave chat' : 'Join chat';

  const handleToggleUserInChat = () => {
    console.log('here');
  };

  return (
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Toolbar />

      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">{`Chat: ${chat?.name || ''}`}</Typography>
        </Grid>
      </Grid>

      <Grid container component={Paper} sx={styles.chatSection}>
        <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
          {user && (
            <List>
              <UserListItem user={user}>
                <ConfirmModal
                  buttonTitle={toggleChatMessage}
                  confirmText={`${toggleChatMessage}, please, confirm`}
                  onConfirm={handleToggleUserInChat}
                />
              </UserListItem>
            </List>
          )}

          <Divider />

          {chat && chat.users.length > 0 && (
            <List>
              {chat.users.map((chatUser) => (
                <UserListItem key={chatUser.id} user={chatUser} />
              ))}
            </List>
          )}
        </Grid>

        <Grid item xs={9}>
          {messages && messages.length > 0 && (
            <List sx={styles.messageArea}>
              {messages.map((msg) => (
                <MessageItem key={msg.id} message={msg} />
              ))}
            </List>
          )}

          <Divider />

          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid item xs={1}>
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
