import { VFC } from 'react';
import { css } from '@emotion/react';

export const WeekMenuPage: VFC = () => {
  return (
    <div css={container}>
      <div>
        <h1>aaa</h1>
      </div>
    </div>
  );
};

const container = css`
  padding: 144px 16px 80px;
  text-align: center;
  max-width: 1600px;
  margin: 0 auto;
  @media screen and (max-width: 750px) {
    padding: 120px 16px 80px;
  }
  @media screen and (max-width: 450px) {
    padding: 104px 0 64px;
  }
`;

const title = css`
  margin: 0 0 24px;
  @media screen and (max-width: 750px) {
    width: 450px;
  }
  @media screen and (max-width: 450px) {
    width: 300px;
  }
`;

const grid = css`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: 0 auto;
`;

const menu = css`
  background: url('/images/backgrounds/wood-background2.png');
  background-size: 100% 100%;
  z-index: 0;
  padding: 4% 2% 14%;
  @media screen and (max-width: 450px) {
    padding: 4% 2% 20%;
  }
  &__title {
    width: 200px;
    margin: 0 0 16px;
    @media screen and (max-width: 750px) {
      width: 160px;
    }
    @media screen and (max-width: 600px) {
      width: 120px;
      margin: 0 0 8px;
    }
    @media screen and (max-width: 320px) {
      width: 100px;
    }
  }
`;

const menuGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
`;

const foodContent = css`
  transform-origin: center 8px 0;
  transition: 0.5s;
  border-radius: 4px;
  box-shadow: 0 0 1px 1px rgba(black, 0.14);
  @media screen and (max-width: 750px) {
    transform-origin: center 4px 0;
  }
  @media screen and (max-width: 600px) {
    transform-origin: center 2px 0;
  }
  &:hover {
    z-index: 2;
    box-shadow: 0 0 5px 1px rgba(black, 0.14);
  }
`;
