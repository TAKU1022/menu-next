import { NextPage } from 'next';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { WeekMenuPage } from 'src/components/page/WeekMenuPage';

const WeekMenu: NextPage = () => {
  return (
    <CommonLayout>
      <WeekMenuPage />
    </CommonLayout>
  );
};

export default WeekMenu;
