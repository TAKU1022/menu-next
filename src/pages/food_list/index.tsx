import type { GetServerSideProps, NextPage } from 'next';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { FoodListPage } from 'src/components/page/FoodListPage';
import { FoodCard } from '@/types/typeFood';
import { fetchFoodList } from 'src/firebase/db/food';

type Props = {
  foodList: FoodCard[];
  lastFoodId: string;
};

const FoodList: NextPage<Props> = ({ foodList, lastFoodId }) => {
  return (
    <CommonLayout>
      <FoodListPage foodList={foodList} lastFoodId={lastFoodId} />
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { foodCardList, lastFoodId } = await fetchFoodList(undefined);

  return {
    props: { foodList: foodCardList, lastFoodId },
  };
};

export default FoodList;
