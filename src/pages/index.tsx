import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
} from 'next';
import nookies from 'nookies';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { HomePage } from '../components/page/HomePage';
import { ParsedUrlQuery } from 'querystring';
import { fetchTodayMenuWithFood } from 'src/firebase/db/myMenu';
import { DayMenuWithFood } from '@/types/typeMyMenu';

type Props = {
  todayMenu: DayMenuWithFood | undefined;
};

const Home: NextPage<Props> = ({ todayMenu }) => {
  return (
    <CommonLayout>
      <HomePage todayMenu={todayMenu} />
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const cookies = nookies.get(context);
  const todayMenu = await fetchTodayMenuWithFood(cookies.userId);

  return {
    props: { todayMenu },
  };
};

export default Home;
