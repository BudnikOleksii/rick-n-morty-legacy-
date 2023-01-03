import { NAME_SPACES, PATHS } from '../constants';
import { SignUpForm } from '../components/organisms/SignUpForm';
import { AuthTemplate } from '../components/templates/AuthTemplate';
import { useTranslation } from 'react-i18next';

const Registration = () => {
  const { t } = useTranslation();

  return (
    <AuthTemplate
      name={t('auth.sign_up', { ns: NAME_SPACES.main })}
      link={PATHS.login}
      linkText={t('auth.sign_in_link', { ns: NAME_SPACES.main })}
    >
      <SignUpForm />
    </AuthTemplate>
  );
};

export default Registration;
