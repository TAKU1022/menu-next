import { useRouter } from 'next/router';
import { useUser } from 'src/hooks/useUser';

export const useRequireAuth = () => {
  const router = useRouter();
  const { firebaseUser } = useUser();

  if (!firebaseUser) {
    router.push('/sign_in');
  }

  return firebaseUser;
};
