import { User } from '@/types/user';
import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';
import { UserContext } from 'src/components/context/user/UserProvider';
import { auth, db } from 'src/firebase';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { userState, dispatch } = context;
  const router = useRouter();

  const listenUserState = useCallback(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data() as User;
            dispatch({ type: 'LOGIN', payload: data });
          });
      } else {
        router.push('/login');
      }
    });
  }, [router, dispatch]);

  return {
    userState,
    listenUserState,
  };
};
