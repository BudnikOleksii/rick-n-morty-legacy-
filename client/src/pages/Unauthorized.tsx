import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAME_SPACES, PATHS } from '../constants';
import { ErrorPage } from '../components/templates/ErrorPage';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <ErrorPage
      errorNumber={401}
      text={t('errors.unauthorized', { ns: NAME_SPACES.main })}
      image="https://bloggersprout.b-cdn.net/wp-content/uploads/2021/04/401.jpg.webp"
    >
      <Button
        variant="contained"
        onClick={() => navigate(PATHS.login)}
        sx={{ marginRight: '20px' }}
      >
        {t('auth.sign_in', { ns: NAME_SPACES.main })}
      </Button>

      <Button variant="contained" onClick={() => navigate(PATHS.registration)}>
        {t('auth.sign_up', { ns: NAME_SPACES.main })}
      </Button>
    </ErrorPage>
  );
};

export default UnauthorizedPage;
