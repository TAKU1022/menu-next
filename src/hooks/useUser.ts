import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from 'src/components/context/user/UserProvider';
import firebase from 'firebase/app';
import { auth } from 'src/firebase';
import { useMessage } from './useMessage';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { firebaseUser, updateFirebaseUser, user, updateUser } = context;
  const router = useRouter();
  const { openMessage } = useMessage();

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
    firebaseUser,
    user,
    signInWithGoogle,
    signOut,
  };
};
