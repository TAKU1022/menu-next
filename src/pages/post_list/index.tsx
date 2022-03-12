import { NextPage } from 'next';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { PostListPage } from 'src/components/page/PostListPage';

const PostList: NextPage = () => {
  return (
    <CommonLayout>
      <PostListPage />
    </CommonLayout>
  );
};

export default PostList;
