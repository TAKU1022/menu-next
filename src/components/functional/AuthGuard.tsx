import { ReactNode, useEffect, VFC } from 'react';
import { useUser } from 'src/hooks/useUser';

type Props = {
  children: ReactNode;
};

export const AuthGuard: VFC<Props> = ({ children }) => {
  const { userState, guardAuth } = useUser();

  useEffect(() => {
    if (!userState) {
      guardAuth();
    }
  }, [userState, guardAuth]);

  return userState ? <>{children}</> : <></>;
};
