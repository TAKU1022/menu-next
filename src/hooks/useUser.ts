import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';
import { UserContext } from 'src/components/context/user/UserProvider';
import { auth } from 'src/firebase';
import { fetchUserById } from 'src/firebase/db/user';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { userState, dispatch } = context;
  const router = useRouter();

  const guardAuth = useCallback(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        fetchUserById(uid).then((snapshot) => {
          const data = snapshot.data();
          dispatch({ type: 'SIGN_IN', payload: data! });
        });
      } else {
        router.push('/sign_in');
      }
    });
  }, [router, dispatch]);

  return {
    userState,
    guardAuth,
  };
};
