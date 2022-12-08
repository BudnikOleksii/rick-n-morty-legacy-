import React from 'react';
import { ErrorPage } from '../components/templates/ErrorPage';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      errorNumber={404}
      text="The page you’re looking for doesn’t exist."
      image="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
    >
      <Button variant="contained" onClick={() => navigate('/')}>
        Back Home
      </Button>
    </ErrorPage>
  );
};

export default NotFoundPage;
