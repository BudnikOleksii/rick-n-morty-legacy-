import React, { useEffect, useState } from 'react';
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
import { FormControlLabel, Switch } from '@mui/material';
import Box from '@mui/material/Box';

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
              onChange={() => setIsAllChats((prev) => !prev)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="All chats"
        />
      </Box>

      {chats && chats.length > 0 && <ChatsList chats={chats} />}

      {chats && chats.length === 0 && <h2>There are no active chats, create one</h2>}
    </PageTemplate>
  );
};

export default Chats;
