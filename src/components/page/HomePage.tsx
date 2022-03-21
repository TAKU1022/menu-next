import { DayMenuWithFood } from '@/types/typeMyMenu';
import { useEffect, useState, VFC } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import { Food } from '@/types/typeFood';
import Link from 'next/link';
import { PrimaryButton } from '../UIkit/PrimaryButton';
import { MdFindReplace, MdCheckCircleOutline, MdUndo } from 'react-icons/md';
import { useUser } from 'src/hooks/useUser';
import { fetchTodayMenuWithFood } from 'src/firebase/db/myMenu';

export const HomePage: VFC = () => {
  const [todayMenu, updateTodayMenu] = useState<DayMenuWithFood | null>(null);
  const { user } = useUser();

  const dayAlt = (index: number) => {
    if (index === 0) return '朝ごはん';
    else if (index === 1) return '昼ごはん';
    else if (index === 2) return '夜ごはん';
  };

  const isEaten = (index: number) => {
    if (!user) return null;

    if (index === 0) return user.isEatenBreakfast;
    else if (index === 1) return user.isEatenLunch;
    else if (index === 2) return user.isEatenDinner;
  };

  useEffect(() => {
    if (user) {
      fetchTodayMenuWithFood(user.uid).then(
        (menuData: DayMenuWithFood | null) => {
          updateTodayMenu(menuData);
        }
      );
    }
  }, [user]);

  return (
    <div css={container}>
      <img src="/images/titles/home-title.png" alt="本日の献立" css={title} />
      {todayMenu && (
        <div css={foodWrapper}>
          {[1, 2, 3].map((number) => (
            <img
              src="/images/others/wood0.png"
              alt="シンプルな木"
              key={number}
              css={wood}
            />
          ))}
          {[1, 2].map((number) => (
            <img
              src="/images/others/wood1.png"
              alt="りんごの実がなる木"
              key={number}
              css={wood}
            />
          ))}
          <div css={grid}>
            {Object.values({
              breakfast: todayMenu.breakfast,
              lunch: todayMenu.lunch,
              dinner: todayMenu.dinner,
            }).map((foodData: Food, index: number) => (
              <div
                key={foodData.foodId}
                css={index !== 1 ? gridItem : girdIemLunch}
              >
                <img
                  src={`/images/titles/day-title${index}.png`}
                  alt={dayAlt(index)}
                  css={index !== 1 ? itemTitle : itemTitleLunch}
                />
                <div css={index !== 1 ? foodContent : foodContentLunch}>
                  <Link
                    href={'/food_list/[slug]'}
                    as={`/food_list/${foodData.foodId}`}
                    passHref
                  >
                    <a css={food}>
                      <img
                        src="/images/others/pin-red.png"
                        alt="赤色のピン"
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
                <div css={index !== 1 ? buttonContent : buttonContentLunch}>
                  <div css={changeFood}>
                    <PrimaryButton Icon={MdFindReplace}>
                      献立差し替え
                    </PrimaryButton>
                  </div>
                  <div css={eatenCheck}>
                    {!isEaten(index) ? (
                      <PrimaryButton Icon={MdCheckCircleOutline}>
                        食べたチェック
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton Icon={MdUndo}>
                        食べたチェック解除
                      </PrimaryButton>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const container = css`
  position: relative;
  padding: 144px 16px 80px;
  text-align: center;
  max-width: 1600px;
  margin: 0 auto;
  @media screen and (max-width: 750px) {
    padding: 120px 16px 80px;
  }
  @media screen and (max-width: 450px) {
    padding: 104px 8px 64px;
  }
`;

const title = css`
  margin: 0 auto 40px;
  @media screen and (max-width: 750px) {
    width: 350px;
  }
  @media screen and (max-width: 450px) {
    margin: 0 auto 32px;
    width: 300px;
  }
`;

const foodWrapper = css`
  max-width: 800px;
  margin: 0 auto;
`;

const wood = css`
  position: absolute;
  width: 30%;
  z-index: 2;
  @media screen and (max-width: 1000px) {
    display: none;
  }
  &:nth-of-type(1) {
    top: 10%;
    right: -16%;
  }
  &:nth-of-type(2) {
    top: 45%;
    right: -10%;
  }
  &:nth-of-type(3) {
    top: 80%;
    right: -8%;
  }
  &:nth-of-type(4) {
    top: 20%;
    left: -14%;
  }
  &:nth-of-type(5) {
    top: 60%;
    left: -8%;
  }
`;

const grid = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
`;

const gridItem = css`
  background: url('/images/backgrounds/wood-background1.png');
  background-size: 100% 100%;
  padding: 10% 10% 22%;
  z-index: 0;
  position: relative;
  &--lunch {
    transform: scale(-1, 1);
  }
`;

const girdIemLunch = css`
  ${gridItem}
  transform: scale(-1, 1);
`;

const itemTitle = css`
  width: 300px;
  margin: 0 auto 16px;
  @media screen and (max-width: 750px) {
    width: 250px;
  }
  @media screen and (max-width: 600px) {
    width: 200px;
    margin: 0 auto 8px;
  }
`;

const itemTitleLunch = css`
  ${itemTitle}
  transform: scale(-1, 1);
`;

const foodContent = css`
  transform: rotate(-1deg);
  transform-origin: center 16px 0;
  position: relative;
  transition: 0.5s;
  @media screen and (max-width: 600px) {
    transform-origin: center 8px 0;
  }
  @media screen and (max-width: 320px) {
    transform-origin: center 4px 0;
  }
  &:hover {
    transform: rotate(-1deg) translateY(-5px);
  }
  &:hover a {
    &::before {
      left: 8px;
      box-shadow: 0 20px ${rgba('#000', 0.3)};
    }
  }
  &:hover a {
    &::after {
      right: 8px;
      box-shadow: 0 20px ${rgba('#000', 0.3)};
    }
  }
`;

const foodContentLunch = css`
  ${foodContent}
  transform: rotate(-1deg) scale(-1, 1);
  &:hover {
    transform: rotate(-1deg) scale(-1, 1) translateY(-5px);
  }
`;

const food = css`
  display: block;
  position: relative;
  padding: 24px;
  background-color: #f0eddd;
  border-radius: 5px;
  margin: 0 0 16px;
  @media screen and (max-width: 600px) {
    padding: 16px;
  }
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
  width: 24px;
  position: absolute;
  top: 16px;
  left: 50%;
  border-radius: 50%;
  box-shadow: 4px 4px 0 0 ${rgba('#000', 0.3)};
  transform: translateX(-50%);
  @media screen and (max-width: 600px) {
    width: 16px;
    top: 8px;
    box-shadow: 3px 3px 0 0 ${rgba('#000', 0.3)};
  }
  @media screen and (max-width: 320px) {
    width: 14px;
    top: 4px;
    box-shadow: 2px 2px 0 0 ${rgba('#000', 0.3)};
  }
`;

const food__image = css`
  background-size: cover;
  background-position: center;
  padding-bottom: 56.25%;
  border-radius: 5px;
`;

const food__name = css`
  font-size: 24px;
  margin: 0;
  color: #8a4d41;
  font-weight: bold;
  letter-spacing: 2.5px;
  padding: 24px 0 0;
  @media screen and (max-width: 600px) {
    font-size: 20px;
    padding: 16px 0 0;
  }
  @media screen and (max-width: 450px) {
    font-size: 16px;
  }
  @media screen and (max-width: 320px) {
    padding: 8px 0 0;
  }
`;

const buttonContent = css`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 600px) {
    flex-flow: column;
  }
`;

const buttonContentLunch = css`
  ${buttonContent}
  transform: scale(-1, 1);
`;

const changeFood = css`
  margin: 0 16px 0 0;
  @media screen and (max-width: 660px) {
    margin: 0 8px 0 0;
  }
  @media screen and (max-width: 600px) {
    margin: 0 auto 8px;
  }
`;

const eatenCheck = css`
  @media screen and (max-width: 600px) {
    margin: 0 auto;
  }
`;
