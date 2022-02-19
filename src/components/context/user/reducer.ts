import { User } from '@/types/typeUser';

export type UserAction = {
  type: string;
  payload: User;
};

export const userReducer = (state: User | undefined, action: UserAction) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
