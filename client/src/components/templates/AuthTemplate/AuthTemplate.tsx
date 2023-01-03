import React, { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/auth-selectors';

interface Props {
  name: string;
  children: ReactNode;
  link: string;
  linkText: string;
}

export const AuthTemplate: FC<Props> = ({ name, children, link, linkText }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector(selectAuth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {name}
        </Typography>

        {children}

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" onClick={() => navigate(link)}>
              {linkText}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
