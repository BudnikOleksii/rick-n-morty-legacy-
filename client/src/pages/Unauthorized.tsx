import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import unauthorizedImage from '../images/401-error.jpg';
import { PATHS } from '../constants';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h1">401</Typography>

            <Typography variant="h6">
              Unauthorized, please sign up or login if you have account.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate(PATHS.login)}
              sx={{ marginRight: '20px' }}
            >
              Login
            </Button>

            <Button variant="contained" onClick={() => navigate(PATHS.registration)}>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={6}>
            <img src={unauthorizedImage} alt="401 error" width={500} height={250} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UnauthorizedPage;
