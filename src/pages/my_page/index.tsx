import { NextPage } from 'next';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { MyPagePage } from 'src/components/page/MyPagePage';

const MyPage: NextPage = () => {
  return (
    <CommonLayout>
      <MyPagePage />
    </CommonLayout>
  );
};

export default MyPage;
