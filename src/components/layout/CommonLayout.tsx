import { ReactNode, VFC } from 'react';
import { AuthGuard } from '../functional/AuthGuard';
import { Header } from '../UIkit/Header';

type Props = {
  children: ReactNode;
};

export const CommonLayout: VFC<Props> = ({ children }) => {
  return (
    <AuthGuard>
      <Header />
      <main>{children}</main>
    </AuthGuard>
  );
};
