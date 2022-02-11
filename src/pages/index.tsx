import type { NextPage } from 'next';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { HomePage } from '../components/page/Home';

const Home: NextPage = () => {
  return (
    <CommonLayout>
      <HomePage />
    </CommonLayout>
  );
};

export default Home;
