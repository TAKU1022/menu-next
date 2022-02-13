import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { auth } from 'src/firebase';
import { useMessage } from './useMessage';

export const useAuth = () => {
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
    signInWithGoogle,
    signOut,
  };
};
