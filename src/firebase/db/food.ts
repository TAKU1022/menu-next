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

export const fetchFoodList = async (food: Food | undefined) => {
  const ref = db.collection('foods').withConverter(foodConverter);
  const snapshot = food
    ? await ref.startAfter(food).limit(24).get()
    : await ref.limit(12).get({ source: 'server' });

  const foodList = snapshot.docs.map((food) => food.data());
  const lastFood = foodList[foodList.length - 1];

  return {
    foodList,
    lastFood,
  };
};
