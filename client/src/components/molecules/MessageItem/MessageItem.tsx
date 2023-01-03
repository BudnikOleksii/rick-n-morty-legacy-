import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/hooks';
import { useOutsideClickHandle } from '../../../hooks/useOutsideClickHandle';
import { IMessage } from '../../../types/chat-messages';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { EditMessageForm } from '../../organisms/EditMessageForm';
import { MessageActionsBlock } from '../../organisms/MessageActionsBlock';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { getLocalTime } from '../../../helpers/date-helpers';
import { teal, indigo } from '@mui/material/colors';
import { NAME_SPACES } from '../../../constants';

const myMsgColor = teal[300];
const msgColor = indigo[300];

interface Props {
  message: IMessage;
}

export const MessageItem: FC<Props> = ({ message }) => {
  const { user: author, body, created_at, updated_at, deleted_at } = message;
  const { t } = useTranslation();
  const { user } = useAppSelector(selectAuth);
  const isUserAuthor = user?.id === author.id;
  const [isEditMode, setIsEditMode] = useState(false);
  const editFieldRef = useRef<HTMLDivElement | null>(null);

  const handleCloseEditMode = () => {
    setIsEditMode(false);
  };

  const handleEditModeToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  useOutsideClickHandle(editFieldRef, handleCloseEditMode);

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
            ref={editFieldRef}
            sx={{
              padding: '5px',
              borderRadius: '8px',
              bgcolor: isUserAuthor ? myMsgColor : msgColor,
              maxWidth: {
                xs: '80%',
                md: '45%',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Avatar alt={author.username}>{author.username.slice(0, 2)}</Avatar>

              {isUserAuthor && !deleted_at && (
                <MessageActionsBlock message={message} onToggleEditMode={handleEditModeToggle} />
              )}
            </Box>

            {isEditMode ? (
              <EditMessageForm message={message} onFormClose={handleCloseEditMode} />
            ) : (
              <ListItemText
                primary={!deleted_at ? body : ''}
                secondary={deleted_at ? t('chat.edit_message', { ns: NAME_SPACES.pages }) : ''}
              />
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', textAlign: 'right' }}>
              <ListItemText secondary={getLocalTime(created_at)} />

              {updated_at && <EditIcon color="disabled" fontSize="small" />}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
};
