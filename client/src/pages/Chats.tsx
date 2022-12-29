import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { PageTemplate } from '../components/templates/PageTemplate';
import { ChatsList } from '../components/organisms/ChatsList';
import { ChatFormModal } from '../components/organisms/ChatFormModal';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectChats } from '../features/chats/chats-selectors';
import { selectAuth } from '../features/auth/auth-selectors';
import { chatsLoadingStart, userChatsLoadingStart } from '../features/chats/chats-slice';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { NAME_SPACES, PATHS } from '../constants';

const Chats = () => {
  const { t } = useTranslation();
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
      title={t('chats.title', { ns: NAME_SPACES.pages })}
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
          label={t('chats.switch', { ns: NAME_SPACES.pages })}
        />
      </Box>

      {chats && chats.length > 0 && <ChatsList chats={chats} />}

      {chats && chats.length === 0 && (
        <Typography variant="h5">{t('chats.not_found', { ns: NAME_SPACES.pages })}</Typography>
      )}
    </PageTemplate>
  );
};

export default Chats;
