import { useState, VFC } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import { Container } from '../UIkit/Container';
import { WoodBackground } from '../UIkit/WoodBackground';
import { Food, RotateType } from '@/types/typeFood';
import { FoodPhotoCard } from '../UIkit/FoodPhotoCard';
import { fetchFoodList } from 'src/firebase/db/food';
import { Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  foodList: Food[];
  lastFoodId: string;
};

export const FoodListPage: VFC<Props> = ({ foodList, lastFoodId }) => {
  const [foods, updateFoods] = useState<Food[]>(foodList);
  const [foodId, updateFoodId] = useState<string>(lastFoodId);
  const [isLoading, updateIsLoading] = useState<boolean>(false);

  const fetchMoreData = () => {
    updateIsLoading((prevState) => !prevState);
    setTimeout(() => {
      fetchFoodList(foodId).then((data) => {
        updateFoods((prevState) => [...prevState, ...data.foodList]);
        updateFoodId(data.lastFoodId);
        updateIsLoading((prevState) => !prevState);
      });
    }, 1000);
  };

  const getRandomRotateId = () => {
    const rotateTypeIds: string[] = ['a', 'b', 'c', 'd', 'e', 'f'];
    const randomNumber: number = Math.floor(
      Math.random() * rotateTypeIds.length
    );
    return { rotateId: rotateTypeIds[randomNumber] } as RotateType;
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
          <InfiniteScroll
            dataLength={foods.length}
            next={fetchMoreData}
            hasMore={true}
            loader={null}
            style={{ overflow: 'initial' }}
            css={grid}
          >
            {foods.map((food) => (
              <div
                css={rotateType[getRandomRotateId().rotateId]}
                key={food.foodId}
              >
                <FoodPhotoCard foodData={food} />
              </div>
            ))}
          </InfiniteScroll>
          {isLoading && (
            <Spinner size="xl" color="#43a047" thickness="4px" mt={4} />
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

const foodContent = css`
  z-index: 0;
  transform-origin: center 8px 0;
  transition: 0.5s;
  border-radius: 4px;
  box-shadow: 0 0 1px 1px ${rgba('#000', 0.14)};
  @media screen and (max-width: 320px) {
    transform-origin: center 4px 0;
  }
  &:hover {
    z-index: 2;
    box-shadow: 0 0 5px 1px ${rgba('#000', 0.14)};
  }
  &:hover a {
    &::before {
      left: 8px;
      box-shadow: 0 18px ${rgba('#000', 0.3)};
    }
  }
  &:hover a {
    &::after {
      right: 8px;
      box-shadow: 0 18px ${rgba('#000', 0.3)};
    }
  }
`;

const rotateType = {
  a: css`
    ${foodContent}
    transform: rotate(-2deg);
    &:hover {
      transform: rotate(-2deg) translateY(-5px);
    }
  `,

  b: css`
    ${foodContent}
    transform: rotate(-3deg);
    &:hover {
      transform: rotate(-3deg) translateY(-5px);
    }
  `,

  c: css`
    ${foodContent}
    transform: rotate(-4deg);
    &:hover {
      transform: rotate(-4deg) translateY(-5px);
    }
  `,

  d: css`
    ${foodContent}
    transform: rotate(2deg);
    &:hover {
      transform: rotate(2deg) translateY(-5px);
    }
  `,

  e: css`
    ${foodContent}
    transform: rotate(3deg);
    &:hover {
      transform: rotate(3deg) translateY(-5px);
    }
  `,

  f: css`
    ${foodContent}
    transform: rotate(4deg);
    &:hover {
      transform: rotate(4deg) translateY(-5px);
    }
  `,
};
