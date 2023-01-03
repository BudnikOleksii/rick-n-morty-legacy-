import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { ErrorPage } from '../components/templates/ErrorPage';
import { NAME_SPACES } from '../constants';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <ErrorPage
      errorNumber={404}
      text={t('errors.not_found', { ns: NAME_SPACES.main })}
      image="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
    >
      <Button variant="contained" onClick={() => navigate('/')}>
        {t('buttons.home', { ns: NAME_SPACES.main })}
      </Button>
    </ErrorPage>
  );
};

export default NotFoundPage;
