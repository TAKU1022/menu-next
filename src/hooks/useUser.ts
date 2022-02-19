import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';
import { UserContext } from 'src/components/context/user/UserProvider';
import firebase from 'firebase/app';
import { auth } from 'src/firebase';
import { fetchUserById } from 'src/firebase/db/user';
import { useMessage } from './useMessage';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { userState, dispatch } = context;
  const router = useRouter();
  const { openMessage } = useMessage();

  const listenUserState = useCallback(() => {
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

  const signInWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
    auth
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        router.push('/');
        if (result.additionalUserInfo?.isNewUser) {
          openMessage('アカウントが作成されました！', 'success');
        } else {
          openMessage('おかえりなさい！', 'success');
        }
      })
      .catch(() => {
        openMessage('ログインに失敗しました', 'error');
      });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      router.push('/sign_in');
      openMessage('またお越しください！', 'success');
    });
  };

  return {
    userState,
    listenUserState,
    signInWithGoogle,
    signOut,
  };
};
