import { useState, VFC } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import { Container } from '../UIkit/Container';
import { WoodBackground } from '../UIkit/WoodBackground';
import { Food, RotateType } from '@/types/typeFood';
import { fetchFoodList } from 'src/firebase/db/food';
import { Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';

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
      <img
        src="/images/titles/food-list-title.png"
        alt="メニュー一覧"
        css={title}
      />
      <WoodBackground>
        <div css={root}>
          <InfiniteScroll
            dataLength={foods.length}
            next={fetchMoreData}
            hasMore={true}
            loader={null}
            style={{ overflow: 'initial' }}
            css={grid}
          >
            {foods.map((foodData: Food) => (
              <div
                key={foodData.foodId}
                css={rotateType[getRandomRotateId().rotateId]}
              >
                <Link
                  href={`/food_list/[slug]`}
                  as={`/food_list/${foodData.foodId}`}
                  passHref
                >
                  <a css={food}>
                    <img
                      src={'/images/others/pin-red.png'}
                      alt=""
                      css={food__pin}
                    />
                    <div
                      style={{ backgroundImage: `url(${foodData.image})` }}
                      css={food__image}
                    ></div>
                    <p css={food__name}>{foodData.name}</p>
                  </a>
                </Link>
              </div>
            ))}
          </InfiniteScroll>
          {isLoading && (
            <Spinner size="lg" color="#43a047" thickness="4px" mt={4} />
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

const food = css`
  cursor: pointer;
  display: block;
  padding: 16px;
  background-color: #f0eddd;
  border-radius: 4px;
  position: relative;
  @media screen and (max-width: 320px) {
    padding: 8px;
  }
  &::before,
  &::after {
    position: absolute;
    content: '';
    z-index: -1;
    top: 60%;
    bottom: 12px;
    width: 50%;
    max-width: 300px;
    border-radius: 4px;
    transition: 0.5s;
    box-shadow: 0 15px ${rgba('#000', 0.3)};
  }
  &::before {
    left: 10px;
    transform: rotate(-5deg);
  }
  &::after {
    right: 10px;
    transform: rotate(5deg);
  }
`;

const food__pin = css`
  width: 16px;
  position: absolute;
  top: 8px;
  left: 50%;
  border-radius: 50%;
  box-shadow: 4px 4px 0 0 ${rgba('#000', 0.3)};
  transform: translateX(-50%);
  @media screen and (max-width: 320px) {
    width: 14px;
    top: 4px;
    box-shadow: 3px 3px 0 0 ${rgba('#000', 0.3)};
  }
`;

const food__image = css`
  background-size: cover;
  background-position: center;
  padding-bottom: 56.25%;
  border-radius: 5px;
`;

const food__name = css`
  margin: 0;
  color: #8a4d41;
  font-weight: bold;
  letter-spacing: 2.5px;
  padding: 16px 0 0;
  @media screen and (max-width: 320px) {
    padding: 8px 0 0;
    font-size: 14px;
  }
`;
