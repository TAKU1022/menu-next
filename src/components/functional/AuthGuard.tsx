import { ReactNode, useEffect, VFC } from 'react';
import { useUser } from 'src/hooks/useUser';

type Props = {
  children: ReactNode;
};

export const AuthGuard: VFC<Props> = ({ children }) => {
  const { userState, listenUserState } = useUser();

  useEffect(() => {
    if (!userState) {
      listenUserState();
    }
  }, [userState, listenUserState]);

  return userState ? <>{children}</> : <></>;
};
