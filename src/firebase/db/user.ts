import firebase from 'firebase/app';
import { User } from '@/types/typeUser';
import { db } from '..';

export const userConverter = {
  toFirestore(user: User): firebase.firestore.DocumentData {
    return { ...user };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): User {
    const data = snapshot.data(options);
    return {
      uid: data.uid,
      name: data.name,
      avaterURL: data.avaterURL,
      email: data.email,
      createdAt: data.createdAt,
      admin: data.admin,
      eatCount: data.eatCount,
      isEatenBreakfast: data.isEatenBreakfast,
      isEatenLunch: data.isEatenLunch,
      isEatenDinner: data.isEatenDinner,
      isCompletedHomeTutorial: data.isCompletedHomeTutorial,
      isCompletedCreateMyMenuTutorial: data.isCompletedCreateMyMenuTutorial,
      isCreatedMyMenu: data.isCreatedMyMenu,
      postCount: data.postCount,
    };
  },
};

export const fetchUserById = async (uid: string): Promise<User | undefined> => {
  const snapshot = await db
    .collection('users')
    .withConverter(userConverter)
    .doc(uid)
    .get();

  return snapshot.data();
};
