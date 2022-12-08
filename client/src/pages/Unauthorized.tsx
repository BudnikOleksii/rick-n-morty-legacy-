import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../constants';
import { ErrorPage } from '../components/templates/ErrorPage';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      errorNumber={401}
      text="Unauthorized, please sign up or login if you have account."
      image="https://bloggersprout.b-cdn.net/wp-content/uploads/2021/04/401.jpg.webp"
    >
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
    </ErrorPage>
  );
};

export default UnauthorizedPage;
