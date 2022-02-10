import { User } from '@/types/user';

export type UserAction = {
  type: string;
  payload: User;
};

export const userReducer = (state: User, action: UserAction) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, ...action.payload };
    case 'SIGN_OUT':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
