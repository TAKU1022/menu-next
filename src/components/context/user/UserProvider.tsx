import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  VFC,
} from 'react';
import { User } from '@/types/typeUser';
import firebase from 'firebase/app';
import { auth, db } from 'src/firebase';
import { destroyCookie, setCookie } from 'nookies';
import { userConverter } from 'src/firebase/db/user';

type Context = {
  firebaseUser: firebase.User | null;
  updateFirebaseUser: Dispatch<SetStateAction<firebase.User | null>>;
  user: User | null;
  updateUser: Dispatch<SetStateAction<User | null>>;
};

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<Context | undefined>(undefined);

export const UserProvider: VFC<Props> = ({ children }) => {
  const [firebaseUser, updateFirebaseUser] = useState<firebase.User | null>(
    null
  );
  const [user, updateUser] = useState<User | null>(null);

  useEffect(() => {
    let unsubscribeUser: firebase.Unsubscribe;
    const unsubscribeAuth = auth.onAuthStateChanged(
      (firebaseUserData: firebase.User | null) => {
        if (firebaseUserData) {
          const uid = firebaseUserData.uid;

          setCookie(null, 'userId', uid, {
            maxAge: 60 * 60 * 24 * 7 * 1000,
          });

          unsubscribeUser = db
            .collection('users')
            .withConverter(userConverter)
            .doc(uid)
            .onSnapshot((snapshot) => {
              updateUser(snapshot.data() || null);
              firebaseUserData.getIdToken(true);
            });
        } else {
          destroyCookie(null, 'userId');
          updateUser(null);
        }

        updateFirebaseUser(firebaseUserData);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeUser();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ firebaseUser, updateFirebaseUser, user, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
