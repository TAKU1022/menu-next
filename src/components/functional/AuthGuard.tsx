import { ReactNode, VFC } from 'react';
import { useUser } from 'src/hooks/useUser';

type Props = {
  children: ReactNode;
};

export const AuthGuard: VFC<Props> = ({ children }) => {
  const { firebaseUser } = useUser();

  if (!firebaseUser) return null;

  return <>{children}</>;
};
