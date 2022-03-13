import { DayMenu, DayMenuWithFood } from './typeMyMenu';
import firebase from 'firebase/app';
import { User } from './typeUser';

export type Post = {
  day: {
    sunday: DayMenu;
    monday: DayMenu;
    tuesday: DayMenu;
    wednesday: DayMenu;
    thursday: DayMenu;
    friday: DayMenu;
    saturday: DayMenu;
  };
  creatorId: string;
  myMenuId: string;
  postId: string;
  createdAt: firebase.firestore.Timestamp;
  title: string;
  thumbnailURLs: string[];
};

export type PostWithFood = {
  days: {
    sunday: DayMenuWithFood;
    monday: DayMenuWithFood;
    tuesday: DayMenuWithFood;
    wednesday: DayMenuWithFood;
    thursday: DayMenuWithFood;
    friday: DayMenuWithFood;
    saturday: DayMenuWithFood;
  };
  creatorId: string;
  postId: string;
  createdAt: firebase.firestore.Timestamp;
  title: string;
  thumbnailURLs: string[];
};

export type PostWithFoodWithUser = {
  postWithFood: PostWithFood;
  creator?: User;
};
