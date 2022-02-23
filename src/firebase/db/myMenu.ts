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
    const data = snapshot.data(options);
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

const fetchMyMenuByUserId = async (
  userId: string
): Promise<MyMenu | undefined> => {
  const snapshot = await db
    .collection('myMenus')
    .withConverter(myMenuConverter)
    .where('creatorId', '==', userId)
    .get();

  const doc = snapshot.docs[0];

  if (doc) return doc.data();
};

export const fetchMyMenuWithFoodByUserId = async (
  userId: string
): Promise<MyMenuWithFood | undefined> => {
  const myMenu: MyMenu | undefined = await fetchMyMenuByUserId(userId);

  if (myMenu) {
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
  }
};
