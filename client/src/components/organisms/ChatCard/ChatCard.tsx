import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import PersonIcon from '@mui/icons-material/Person';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChatIcon from '@mui/icons-material/Chat';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { IChat } from '../../../types/chat-messages';
import { modalStyles } from '../../../modal-styles';

interface Props {
  chat: IChat;
}

export const ChatCard: FC<Props> = ({ chat }) => {
  const navigate = useNavigate();
  const { id, name, users } = chat;
  const [openUsersInChatModal, setOpenUsersInChatModal] = useState(false);

  const handleOpenChat = () => {
    navigate(String(id));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => setOpenUsersInChatModal(true)}>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>

        <ListItemText primary={name} />
      </ListItemButton>

      <Button onClick={handleOpenChat}>Open</Button>

      <Modal
        open={openUsersInChatModal}
        onClose={() => setOpenUsersInChatModal(false)}
        aria-labelledby="modal-users"
        aria-describedby="modal-users-list-for-current-chat"
      >
        <Box sx={modalStyles}>
          {users.length > 0 ? (
            <List>
              {users.map((user) => (
                <ListItemComponent
                  key={user.id}
                  name="Username"
                  value={user.username}
                  icon={<PersonIcon />}
                />
              ))}
            </List>
          ) : (
            <div>There are no users in chat</div>
          )}
        </Box>
      </Modal>
    </ListItem>
  );
};
