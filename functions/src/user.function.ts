import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { User } from '@/types/user';
admin.initializeApp();

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    const userData: User = {
      uid: user.uid,
      name: user.displayName,
      avaterURL: user.photoURL,
      email: user.email,
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
    return db.doc(`users/${user.uid}`).set({ ...userData });
  });
