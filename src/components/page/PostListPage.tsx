import { useEffect, useState, VFC } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import { Container } from '../UIkit/Container';
import { WoodBackground } from '../UIkit/WoodBackground';
import { PostWithFoodWithUser } from '@/types/typePost';
import { fetchPostWithFoodWithUserList } from 'src/firebase/db/post';
import { PostCard } from '../UIkit/PostCard';

export const PostListPage: VFC = () => {
  const [postList, updatePostList] = useState<PostWithFoodWithUser[]>();

  useEffect(() => {
    fetchPostWithFoodWithUserList().then((postListData) =>
      updatePostList(postListData)
    );
  }, []);

  return (
    <Container>
      <img src="/images/titles/post-title.png" alt="みんなの献立" css={title} />
      <WoodBackground>
        <div css={root}>
          <div css={grid}>
            {postList &&
              postList.map((post: PostWithFoodWithUser) => (
                <PostCard key={post.postWithFood.postId} postData={post} />
              ))}
          </div>
        </div>
      </WoodBackground>
    </Container>
  );
};

const root = css`
  padding: 56px 32px;
  @media screen and (max-width: 450px) {
    padding: 40px 24px;
  }
`;

const title = css`
  margin: 0 auto 40px;
  @media screen and (max-width: 450px) {
    margin: 0 auto 32px;
    width: 90%;
  }
`;

const grid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  column-gap: 24px;
  row-gap: 32px;
  @media screen and (max-width: 320px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
`;
