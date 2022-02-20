import { ReactNode, useEffect, VFC } from 'react';
import { useUser } from 'src/hooks/useUser';

type Props = {
  children: ReactNode;
};

export const GuestGuard: VFC<Props> = ({ children }) => {
  const { listenGuestState } = useUser();

  useEffect(() => {
    listenGuestState();
  }, [listenGuestState]);

  return <>{children}</>;
};
