import { useTranslation } from 'react-i18next';
import { NAME_SPACES, PATHS } from '../constants';
import { LoginForm } from '../components/organisms/LoginForm';
import { AuthTemplate } from '../components/templates/AuthTemplate';

const Login = () => {
  const { t } = useTranslation();

  return (
    <AuthTemplate
      name={t('auth.sign_in', { ns: NAME_SPACES.main })}
      link={PATHS.registration}
      linkText={t('auth.sign_up_link', { ns: NAME_SPACES.main })}
    >
      <LoginForm />
    </AuthTemplate>
  );
};

export default Login;
