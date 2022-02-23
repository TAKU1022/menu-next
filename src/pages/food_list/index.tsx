import type { GetServerSideProps, NextPage } from 'next';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { FoodListPage } from 'src/components/page/FoodListPage';
import { fetchFoodList } from 'src/firebase/db/food';
import { Food } from '@/types/typeFood';

type Props = {
  foodList: Food[];
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
  const { foodList, lastFoodId } = await fetchFoodList(undefined);

  return {
    props: { foodList, lastFoodId },
  };
};

export default FoodList;
