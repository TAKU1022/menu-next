import { useEffect, useState, VFC } from 'react';
import { css } from '@emotion/react';
import { Container } from '../UIkit/Container';
import { WoodBackground } from '../UIkit/WoodBackground';
import { FoodCard } from '@/types/typeFood';
import { FoodPhotoCard } from '../UIkit/FoodPhotoCard';
import { fetchFoodList } from 'src/firebase/db/food';
import { Button } from '@chakra-ui/react';

type Props = {
  foodList: FoodCard[];
  lastFoodId: string;
};

export const FoodListPage: VFC<Props> = ({ foodList, lastFoodId }) => {
  const [foodCards, updateFoodCards] = useState<FoodCard[]>(foodList);
  const [foodId, updateFoodId] = useState<string>(lastFoodId);

  const onClickMoreButton = () => {
    fetchFoodList(foodId).then((data) => {
      updateFoodCards((prevState) => [...prevState, ...data.foodCardList]);
      updateFoodId(data.lastFoodId);
    });
  };

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
            {foodCards.map((foodCard) => (
              <FoodPhotoCard key={foodCard.data.foodId} foodCard={foodCard} />
            ))}
          </div>
          {foodId && (
            <Button mt={8} onClick={onClickMoreButton}>
              もっとみる
            </Button>
          )}
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
