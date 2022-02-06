import { User } from '../../../types/user';

export type UserAction = {
  type: string;
  payload: User;
};

export const userReducer = (state: User, action: UserAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
