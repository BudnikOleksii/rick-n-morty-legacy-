import { FC } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import Box from '@mui/material/Box';
import ShareIcon from '@mui/icons-material/Share';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';
import { CLIENT_URL, PATHS } from '../../../constants';

export const SocialMediaButtons = () => {
  const { user } = useAppSelector(selectAuth);
  const url = CLIENT_URL + PATHS.userCards(user?.id || 0);
  console.log(url);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '85vh',
        right: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      <ShareIcon color="action" />
      <FacebookShareButton url={url} quote="Rick and Morty cards auction" hashtag="#ricknmorty">
        <FacebookIcon size={36} />
      </FacebookShareButton>
    </Box>
  );
};
