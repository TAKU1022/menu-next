import { DayMenu, DayMenuWithFood } from '@/types/typeMyMenu';
import { Post, PostWithFood, PostWithFoodWithUser } from '@/types/typePost';
import { User } from '@/types/typeUser';
import firebase from 'firebase/app';
import { db } from '..';
import { fetchFoodById } from './food';
import { fetchUserById } from './user';

const postConverter = {
  toFirestore(post: Post): firebase.firestore.DocumentData {
    return { ...post };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Post {
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
      postId: data.postId,
      createdAt: data.createdAt,
      title: data.title,
      thumbnailURLs: data.thumbnailURLs,
    };
  },
};

const dayOfWeeks = ['日', '月', '火', '水', '木', '金', '土'];

const fetchPostById = async (postId: string): Promise<Post | undefined> => {
  const snapshot = await db
    .collection('posts')
    .withConverter(postConverter)
    .doc(postId)
    .get();

  return snapshot.data();
};

const fetchPostList = async (): Promise<Post[] | undefined> => {
  const snapshot = await db
    .collection('posts')
    .withConverter(postConverter)
    .get();

  const postList: Post[] = snapshot.docs.map((doc) => doc.data());

  if (postList) return postList;
};

const mergePostWithFood = async (post: Post): Promise<PostWithFood> => {
  const dayMenuWithFoodList = Object.values(post.day).map(
    async (dayMneu: DayMenu, index: number) => {
      return {
        breakfast: await fetchFoodById(dayMneu.breakfastId),
        lunch: await fetchFoodById(dayMneu.lunchId),
        dinner: await fetchFoodById(dayMneu.dinnerId),
        dayOfWeek: dayOfWeeks[index],
      };
    }
  );

  return {
    days: {
      sunday: await dayMenuWithFoodList[0],
      monday: await dayMenuWithFoodList[1],
      tuesday: await dayMenuWithFoodList[2],
      wednesday: await dayMenuWithFoodList[3],
      thursday: await dayMenuWithFoodList[4],
      friday: await dayMenuWithFoodList[5],
      saturday: await dayMenuWithFoodList[6],
    },
    creatorId: post.creatorId,
    postId: post.postId,
    createdAt: post.createdAt,
    title: post.title,
    thumbnailURLs: post.thumbnailURLs,
  };
};

const fetchPostWithFoodList = async (): Promise<PostWithFood[] | undefined> => {
  const postList = await fetchPostList();

  if (postList) {
    return Promise.all(postList.map((post: Post) => mergePostWithFood(post)));
  }
};

export const fetchPostWithFoodWithUserList = async (): Promise<
  PostWithFoodWithUser[] | undefined
> => {
  const postWithFoodList = await fetchPostWithFoodList();

  if (postWithFoodList) {
    const distinctUserIds: string[] = Array.from(
      new Set(
        postWithFoodList.map(
          (postWithFood: PostWithFood) => postWithFood.creatorId
        )
      )
    );

    const userList = await Promise.all(
      distinctUserIds.map((userId: string) => fetchUserById(userId))
    );

    return postWithFoodList.map((postWithFood: PostWithFood) => {
      return {
        postWithFood,
        creator: userList.find(
          (user: User | undefined) => user!.uid === postWithFood.creatorId
        ),
      };
    });
  }
};
