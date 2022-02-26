import { Food } from '@/types/typeFood';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
  PreviewData,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

import { CommonLayout } from 'src/components/layout/CommonLayout';
import { fetchAllFood, fetchFoodById } from 'src/firebase/db/food';
import { FoodDetailPage } from 'src/components/page/FoodDetailPage';

type Props = {
  food: Food;
};

const FoodDetail: NextPage<Props> = ({ food }) => {
  return (
    <CommonLayout>
      <FoodDetailPage food={food} />
    </CommonLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allFood = await fetchAllFood();
  const paths = allFood.map((food: Food) => ({
    params: { slug: food.foodId },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  const foodId = context.params!.slug as string;
  const food = await fetchFoodById(foodId);

  return {
    props: { food },
  };
};

export default FoodDetail;
