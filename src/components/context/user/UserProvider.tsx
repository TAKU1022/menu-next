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
import { userConverter } from 'src/firebase/db/user';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  useEffect(() => {
    let unsubscribeUser: firebase.Unsubscribe;
    const unsubscribeAuth = auth.onAuthStateChanged(
      (firebaseUserData: firebase.User | null) => {
        if (firebaseUserData) {
          const uid = firebaseUserData.uid;

          unsubscribeUser = db
            .collection('users')
            .withConverter(userConverter)
            .doc(uid)
            .onSnapshot((snapshot) => {
              updateUser(snapshot.data() || null);
              firebaseUserData.getIdToken(true);
            });
        } else {
          router.push('/sign_in');
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
