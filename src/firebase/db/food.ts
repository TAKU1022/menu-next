import firebase from 'firebase/app';
import { db } from '..';
import { Food, FoodCard, RotateType } from '@/types/typeFood';

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

const getRandomRotateId = (): RotateType => {
  const rotateTypeIds: string[] = ['a', 'b', 'c', 'd', 'e', 'f'];
  const randomNumber: number = Math.floor(Math.random() * rotateTypeIds.length);
  const rotateType = { rotateId: rotateTypeIds[randomNumber] } as RotateType;
  return rotateType;
};

export const fetchFoodList = async (foodId: string | undefined) => {
  const perPage = 24;

  const ref = db.collection('foods').withConverter(foodConverter);
  const snapshot = foodId
    ? await ref
        .orderBy('foodId')
        .limit(perPage)
        .startAfter(foodId)
        .get({ source: 'server' })
    : await ref.orderBy('foodId').limit(perPage).get({ source: 'server' });

  const foodCardList: FoodCard[] = snapshot.docs.map(
    (doc: firebase.firestore.QueryDocumentSnapshot<Food>) => {
      const foodData: Food = doc.data();
      const rotateType = getRandomRotateId();
      return {
        data: foodData,
        rotateType,
      };
    }
  );
  const lastFoodId = foodCardList.map((foodCard) => foodCard.data.foodId)[
    foodCardList.length - 1
  ];

  return { foodCardList, lastFoodId };
};
