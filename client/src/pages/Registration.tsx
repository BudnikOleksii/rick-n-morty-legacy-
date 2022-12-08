import { PATHS } from '../constants';
import { SignUpForm } from '../components/organisms/SignUpForm';
import { AuthTemplate } from '../components/templates/AuthTemplate';

const Registration = () => (
  <AuthTemplate name="Sign up" link={PATHS.login} linkText="Already have an account? Sign in">
    <SignUpForm />
  </AuthTemplate>
);

export default Registration;
