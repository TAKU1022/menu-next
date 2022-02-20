import type { NextPage } from 'next';
import { GuestLayout } from 'src/components/layout/GuestLayout';
import { SignInPage } from 'src/components/page/SignInPage';

const Login: NextPage = () => {
  return (
    <GuestLayout>
      <SignInPage />
    </GuestLayout>
  );
};

export default Login;
