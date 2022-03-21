import firebase from 'firebase/app';
import { db } from '..';
import {
  DayMenu,
  DayMenuWithFood,
  MyMenu,
  MyMenuWithFood,
} from '@/types/typeMyMenu';
import { fetchFoodById } from './food';

const myMenuConverter = {
  toFirestore(myMenu: MyMenu): firebase.firestore.DocumentData {
    return { ...myMenu };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): MyMenu {
    const data = snapshot.data(options) as MyMenu;

    return {
      day: {
        sunday: data.day.sunday,
        monday: data.day.monday,
        tuesday: data.day.tuesday,
        wednesday: data.day.wednesday,
        thursday: data.day.thursday,
        friday: data.day.friday,
        saturday: data.day.saturday,
      },
      creatorId: data.creatorId,
      myMenuId: data.myMenuId,
    };
  },
};

const dayOfWeeks = ['日', '月', '火', '水', '木', '金', '土'];

const fetchMyMenuByUserId = async (userId: string): Promise<MyMenu | null> => {
  const snapshot = await db
    .collection('myMenus')
    .withConverter(myMenuConverter)
    .where('creatorId', '==', userId)
    .get();

  const doc = snapshot.docs[0];

  if (!doc) return null;

  return doc.data();
};

export const fetchMyMenuWithFood = async (
  userId: string
): Promise<MyMenuWithFood | null> => {
  const myMenu: MyMenu | null = await fetchMyMenuByUserId(userId);

  if (!myMenu) return null;

  const dayMenuWithFoodList: Promise<DayMenuWithFood>[] = Object.values(
    myMenu.day
  ).map(async (dayMenu: DayMenu, index: number) => {
    return {
      breakfast: await fetchFoodById(dayMenu.breakfastId),
      lunch: await fetchFoodById(dayMenu.lunchId),
      dinner: await fetchFoodById(dayMenu.dinnerId),
      dayOfWeek: dayOfWeeks[index],
    };
  });

  return {
    sundayFood: await dayMenuWithFoodList[0],
    mondayFood: await dayMenuWithFoodList[1],
    tuesdayFood: await dayMenuWithFoodList[2],
    wednesdayFood: await dayMenuWithFoodList[3],
    thursdayFood: await dayMenuWithFoodList[4],
    fridayFood: await dayMenuWithFoodList[5],
    saturdayFood: await dayMenuWithFoodList[6],
  };
};

export const fetchTodayMenuWithFood = async (
  userId: string
): Promise<DayMenuWithFood | null> => {
  const myMenu: MyMenuWithFood | null = await fetchMyMenuWithFood(userId);
  const today = new Date();
  const dayOfWeek: number = today.getDay();

  if (!myMenu) return null;

  return Object.values(myMenu)[dayOfWeek];
};
