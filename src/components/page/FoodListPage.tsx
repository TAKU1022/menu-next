import { useState, VFC } from 'react';
import { css } from '@emotion/react';
import { Container } from '../UIkit/Container';
import { WoodBackground } from '../UIkit/WoodBackground';
import { Food } from '@/types/typeFood';
import { FoodCard } from '../UIkit/FoodCard';

type Props = {
  foodList: Food[];
};

export const FoodListPage: VFC<Props> = ({ foodList }) => {
  const [foods, updateFoods] = useState<Food[]>(foodList);

  return (
    <Container>
      <WoodBackground>
        <div css={root}>
          <img
            css={title}
            src="/images/titles/food-list-title.png"
            alt="メニュー一覧"
          />
          <div css={grid}>
            {foods.map((food) => (
              <FoodCard key={food.foodId} foodData={food} />
            ))}
          </div>
        </div>
      </WoodBackground>
    </Container>
  );
};

const root = css`
  padding: 48px 32px 56px;
  @media screen and (max-width: 450px) {
    padding: 32px 24px 40px;
  }
`;

const title = css`
  margin: 0 auto 48px;
  @media screen and (max-width: 600px) {
    margin: 0 auto 40px;
    width: 300px;
  }
  @media screen and (max-width: 320px) {
    width: 90%;
  }
`;

const grid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 450px;
    margin: 0 auto;
  }
`;
