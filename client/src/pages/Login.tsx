import { PATHS } from '../constants';
import { LoginForm } from '../components/organisms/LoginForm';
import { AuthTemplate } from '../components/templates/AuthTemplate';

const Login = () => (
  <AuthTemplate name="Sign in" link={PATHS.registration} linkText="Don't have an account? Sign Up">
    <LoginForm />
  </AuthTemplate>
);

export default Login;
