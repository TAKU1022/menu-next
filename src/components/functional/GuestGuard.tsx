import { useRouter } from 'next/router';
import { ReactNode, useEffect, VFC } from 'react';
import { useUser } from 'src/hooks/useUser';

type Props = {
  children: ReactNode;
};

export const GuestGuard: VFC<Props> = ({ children }) => {
  const { firebaseUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (firebaseUser) {
      router.push('/');
    }
  }, [firebaseUser, router]);

  if (firebaseUser) return null;

  return <>{children}</>;
};
