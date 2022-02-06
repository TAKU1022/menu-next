import { ReactNode, VFC } from 'react';

type Props = {
  children: ReactNode;
};

export const AuthGuard: VFC<Props> = ({ children }) => {
  return <>{children}</>;
};
