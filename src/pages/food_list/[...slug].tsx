import {
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
  PreviewData,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { CommonLayout } from 'src/components/layout/CommonLayout';

const FoodDetail: NextPage = () => {
  return (
    <CommonLayout>
      <div>
        <p>food</p>
      </div>
    </CommonLayout>
  );
};

export const getStaticProps: GetStaticProps = (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  return {
    props: {},
  };
};

export default FoodDetail;
