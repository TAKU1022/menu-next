import { createContext, Dispatch, ReactNode, useReducer, VFC } from 'react';
import { User } from '@/types/user';
import { UserAction, userReducer } from './reducer';

type Context = {
  userState: User | undefined;
  dispatch: Dispatch<UserAction>;
};

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<Context | undefined>(undefined);

export const UserProvider: VFC<Props> = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, undefined);

  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
