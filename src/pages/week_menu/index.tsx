import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
} from 'next';
import nookies from 'nookies';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { WeekMenuPage } from 'src/components/page/WeekMenuPage';
import { fetchMyMenuWithFoodByUserId } from 'src/firebase/db/myMenu';
import { MyMenuWithFood } from '@/types/typeMyMenu';
import { ParsedUrlQuery } from 'querystring';

type Props = {
  myMenu: MyMenuWithFood | undefined;
};

const WeekMenu: NextPage<Props> = ({ myMenu }) => {
  return (
    <CommonLayout>
      <WeekMenuPage myMenu={myMenu} />
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const cookies = nookies.get(context);
  const myMenu = await fetchMyMenuWithFoodByUserId(cookies.userId);

  return {
    props: { myMenu },
  };
};

export default WeekMenu;
