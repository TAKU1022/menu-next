import { GetServerSideProps, NextPage } from 'next';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { WeekMenuPage } from 'src/components/page/WeekMenuPage';
import { auth } from 'src/firebase';
import { fetchMyMenuWithFoodByUserId } from 'src/firebase/db/myMenu';
import { MyMenuWithFood } from '@/types/typeMyMenu';

type Props = {
  myMenu: MyMenuWithFood;
};

const WeekMenu: NextPage<Props> = ({ myMenu }) => {
  return (
    <CommonLayout>
      <WeekMenuPage />
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // const userId = auth.currentUser!.uid;
  // const myMenu = await fetchMyMenuWithFoodByUserId(userId);
  return {
    props: {},
  };
};

export default WeekMenu;
