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

export const fetchFoodList = async (currentPage: number) => {
  const perPage = 24;
  const ref = db.collection('foods').withConverter(foodConverter);
  const snapshot = await ref
    .orderBy('categoryId')
    .startAfter(currentPage)
    .limit(perPage)
    .get({ source: 'server' });

  const foodList = snapshot.docs.map((food) => food.data());

  return {
    foodList,
  };
};
