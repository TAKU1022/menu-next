import { useRouter } from 'next/router';
import { ReactNode, useEffect, VFC } from 'react';
import { useUser } from 'src/hooks/useUser';

type Props = {
  children: ReactNode;
};

export const GuestGuard: VFC<Props> = ({ children }) => {
  const router = useRouter();
  const { firebaseUser } = useUser();

  useEffect(() => {
    if (firebaseUser) {
      router.push('/');
    }
  }, [firebaseUser, router]);

  if (firebaseUser) return null;

  return <>{children}</>;
};
