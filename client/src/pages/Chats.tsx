import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from '../components/templates/PageTemplate';
import { ChatsList } from '../components/organisms/ChatsList';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectChats } from '../features/chats/chats-selectors';
import { selectAuth } from '../features/auth/auth-selectors';
import { chatsLoadingStart, userChatsLoadingStart } from '../features/chats/chats-slice';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { PATHS } from '../constants';
import { ChatFormModal } from '../components/organisms/ChatFormModal';

const Chats = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { chats, chatsInfo } = useAppSelector(selectChats);
  const { user, isAdmin } = useAppSelector(selectAuth);
  const [isAllChats, setIsAllChats] = useState(false);

  useEffect(() => {
    if (!isAllChats && user) {
      dispatch(registerAction(userChatsLoadingStart.type));
      dispatch(
        userChatsLoadingStart({
          userId: user.id,
          params: `?page=${page || 1}`,
        })
      );
    } else {
      dispatch(registerAction(chatsLoadingStart.type));
      dispatch(
        chatsLoadingStart({
          params: `?page=${page || 1}`,
        })
      );
    }
  }, [page, isAllChats]);

  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.chats}?page=${pageNumber}`);
  };

  const handleChatsSwitchChange = () => {
    navigate(PATHS.chats);
    setIsAllChats((prev) => !prev);
  };

  return (
    <PageTemplate
      title="All chats"
      info={chatsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {isAdmin && <ChatFormModal />}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControlLabel
          control={
            <Switch
              checked={isAllChats}
              onChange={handleChatsSwitchChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="All chats"
        />
      </Box>

      {chats && chats.length > 0 && <ChatsList chats={chats} />}

      {chats && chats.length === 0 && (
        <Typography variant="h5">There are no active chats, create one</Typography>
      )}
    </PageTemplate>
  );
};

export default Chats;
