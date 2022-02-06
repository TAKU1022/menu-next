import { createContext, Dispatch, ReactNode, useReducer, VFC } from 'react';
import { User } from '@/types/user';
import { UserAction, userReducer } from './reducer';

type Context = {
  userState: User;
  dispatch: Dispatch<UserAction>;
};

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<Context | undefined>(undefined);

export const initialUserState = {
  uid: '',
  name: '',
  avaterURL: '',
  email: '',
  createdAt: new Date(),
  admin: false,
  eatCount: 0,
  isEatenBreakfast: false,
  isEatenLunch: false,
  isEatenDinner: false,
  isCompletedCreateMyMenuTutorial: false,
  isCompletedHomeTutorial: false,
  isCreatedMyMenu: false,
  postCount: 0,
};

export const UserProvider: VFC<Props> = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
