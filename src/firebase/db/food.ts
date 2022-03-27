import firebase from 'firebase/app';
import { db } from '..';
import { Food } from '@/types/typeFood';

const foodConverter = {
  toFirestore(food: Food): firebase.firestore.DocumentData {
    return { ...food };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Food {
    const data = snapshot.data(options);
    return {
      name: data.name,
      image: data.image,
      foodId: data.foodId,
      categoryId: data.categoryId,
    };
  },
};

export const fetchFoodById = async (foodId: string): Promise<Food> => {
  const snapshot = await db
    .collection('foods')
    .withConverter(foodConverter)
    .doc(foodId)
    .get();

  return snapshot.data()!;
};

export const fetchFoodList = async (
  foodId: string | null
): Promise<{ foodList: Food[]; lastFoodId: string }> => {
  const perPage = 24;

  const ref = db.collection('foods').withConverter(foodConverter);
  const snapshot = foodId
    ? await ref
        .orderBy('foodId')
        .startAfter(foodId)
        .limit(perPage)
        .get({ source: 'server' })
    : await ref.orderBy('foodId').limit(perPage).get({ source: 'server' });

  const foodList = snapshot.docs.map(
    (doc: firebase.firestore.QueryDocumentSnapshot<Food>) => {
      const foodData: Food = doc.data();
      return foodData;
    }
  );
  const lastFoodId = foodList.map((food) => food.foodId)[foodList.length - 1];

  return { foodList, lastFoodId };
};

export const fetchAllFood = async (): Promise<Food[]> => {
  const snapshot = await db
    .collection('foods')
    .withConverter(foodConverter)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};
