import { ReactNode, VFC } from 'react';
import { AuthGuard } from '../functional/AuthGuard';
import { CommonHeader } from '../UIkit/CommonHeader';

type Props = {
  children: ReactNode;
};

export const CommonLayout: VFC<Props> = ({ children }) => {
  return (
    <AuthGuard>
      <CommonHeader />
      <main>{children}</main>
    </AuthGuard>
  );
};
