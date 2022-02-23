import { ReactNode, useEffect, VFC } from 'react';
import { useUser } from 'src/hooks/useUser';
import { initialUserState } from '../context/user/UserProvider';

type Props = {
  children: ReactNode;
};

export const AuthGuard: VFC<Props> = ({ children }) => {
  const { userState, listenUserState } = useUser();

  useEffect(() => {
    if (userState === initialUserState) {
      listenUserState();
    }
  }, [userState, listenUserState]);

  return userState === initialUserState ? <></> : <>{children}</>;
};
