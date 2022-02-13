import type { GetServerSideProps, NextPage } from 'next';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { FoodListPage } from 'src/components/page/FoodListPage';
import { Food } from '@/types/typeFood';
import { fetchFoodList } from 'src/firebase/db/food';

type Props = {
  foodList: Food[];
};

const FoodList: NextPage<Props> = ({ foodList }) => {
  return (
    <CommonLayout>
      <FoodListPage foodList={foodList} />
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { foodList } = await fetchFoodList(0);

  return {
    props: { foodList },
  };
};

export default FoodList;
