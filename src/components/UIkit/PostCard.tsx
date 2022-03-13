import Link from 'next/link';
import { VFC } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import { PostWithFoodWithUser } from '@/types/typePost';

type Props = {
  postData: PostWithFoodWithUser;
};

export const PostCard: VFC<Props> = ({ postData }) => {
  return (
    <div css={post}>
      {[1, 2].map((number) => (
        <img
          src="/images/others/pin-yellow.png"
          alt="黄色のピン"
          key={number}
          css={post__pin}
        />
      ))}
      <Link
        href={`/post_list/[slug]`}
        as={`/post_list/${postData.postWithFood.postId}`}
        passHref
      >
        <a>
          <p css={post__title}>{postData.postWithFood.title}</p>
        </a>
      </Link>
      <Link
        href={`/post_list/[slug]`}
        as={`/post_list/${postData.postWithFood.postId}`}
        passHref
      >
        <a>
          <div css={post__foodContent}>
            {postData.postWithFood.thumbnailURLs.map(
              (thumbnailURL: string, index: number) => (
                <div key={index} css={post__foodPhoto}>
                  <div
                    style={{ backgroundImage: `url(${thumbnailURL})` }}
                    css={post__foodImage}
                  ></div>
                </div>
              )
            )}
          </div>
        </a>
      </Link>
      <div css={post__userContent}>
        <Link
          href={`/user/[slug]`}
          as={`/user/${postData.postWithFood.creatorId}`}
          passHref
        >
          <a css={post__userAvatar}>
            <img
              src={postData.creator?.avaterURL}
              alt={`${postData.creator?.name}さんのアバター`}
            />
          </a>
        </Link>
        <Link
          href={`/user/[slug]`}
          as={`/user/${postData.postWithFood.creatorId}`}
          passHref
        >
          <a>
            <div css={post__userAbout}>
              <p css={post__userName}>{postData.creator?.name}</p>
              <p css={post__date}>
                {postData.postWithFood.createdAt.toDate().toLocaleDateString()}
              </p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

const post = css`
  background-color: #43a047;
  border-radius: 4px;
  box-shadow: 6px 6px 0 0 ${rgba('#000', 0.4)};
  position: relative;
`;

const post__pin = css`
  position: absolute;
  top: 8px;
  width: 16px;
  border-radius: 50%;
  box-shadow: 4px 4px 0 0 ${rgba('#000', 0.3)};
  z-index: 1;
  &:nth-of-type(1) {
    left: 8px;
    @media screen and (max-width: 320px) {
      left: 4px;
    }
  }
  &:nth-of-type(2) {
    right: 8px;
    @media screen and (max-width: 320px) {
      right: 4px;
    }
  }
`;

const post__title = css`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  margin: 0;
  padding: 16px 24px;
  letter-spacing: 2px;
`;

const post__foodContent = css`
  padding-bottom: 80%;
  position: relative;
  overflow: hidden;
`;

const post__foodPhoto = css`
  padding: 8px;
  background-color: #f0eddd;
  border-radius: 4px;
  position: absolute;
  box-shadow: 0 0 1px 1px ${rgba('#000', 0.14)};
  &:nth-of-type(1) {
    width: 53%;
    top: -5%;
    left: -2%;
    transform: rotate(10deg);
    z-index: 1;
  }
  &:nth-of-type(2) {
    width: 55%;
    top: -10%;
    right: -2%;
    transform: rotate(-8deg);
  }
  &:nth-of-type(3) {
    width: 60%;
    top: 33%;
    left: -2%;
    transform: rotate(6deg);
  }
  &:nth-of-type(4) {
    width: 70%;
    top: 25%;
    right: -2%;
    transform: rotate(-5deg);
  }
  &:nth-of-type(5) {
    width: 60%;
    top: 66%;
    left: -3%;
    transform: rotate(3deg);
  }
  &:nth-of-type(6) {
    width: 50%;
    top: 50%;
    right: 0;
    transform: rotate(4deg);
  }
  &:nth-of-type(7) {
    width: 60%;
    top: 75%;
    right: -3%;
    transform: rotate(-7deg);
  }
`;

const post__foodImage = css`
  background-size: cover;
  background-position: center;
  padding-bottom: 56.25%;
  border-radius: 4px;
`;

const post__userContent = css`
  display: flex;
  padding: 16px;
`;

const post__userAvatar = css`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: auto 8px auto 0;
  img {
    border-radius: 50%;
  }
  &:hover {
    opacity: 0.6;
  }
`;

const post__userAbout = css`
  width: 240px;
  text-align: left;
  border-radius: 4px;
  &:hover {
    background-color: #388e3c;
  }
`;

const post__userName = css`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const post__date = css`
  color: #fff;
  font-size: 13px;
  margin: 0;
`;
