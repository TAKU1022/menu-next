import { useEffect, useState, VFC } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import { DayMenuWithFood, MyMenuWithFood } from '@/types/typeMyMenu';
import { PrimaryFoodPhotoCard } from '../UIkit/PrimaryFoodPhotoCard';
import { fetchMyMenuWithFood } from 'src/firebase/db/myMenu';
import { useUser } from 'src/hooks/useUser';

export const WeekMenuPage: VFC = () => {
  const [myMenu, updateMyMenu] = useState<MyMenuWithFood | null>(null);
  const { user } = useUser();

  const rotateType = (index: number) =>
    (index + 1) % 2 === 0 ? rotateEvenType : rotateOddType;

  useEffect(() => {
    if (user) {
      fetchMyMenuWithFood(user.uid).then(
        (myMenuData: MyMenuWithFood | null) => {
          updateMyMenu(myMenuData);
        }
      );
    }
  }, [user]);

  return (
    <div css={container}>
      <img src="/images/titles/menu-title.png" alt="一週間の献立" css={title} />
      <div css={grid}>
        {myMenu &&
          Object.values(myMenu).map(
            (dayMenu: DayMenuWithFood, index: number) => (
              <div css={menu} key={dayMenu.dayOfWeek}>
                <img
                  src={`/images/titles/day-of-week-title${index}.png`}
                  alt={`${dayMenu.dayOfWeek}曜日`}
                  css={menu__title}
                />
                <div css={menuGrid}>
                  <div css={rotateType(index).breakfast}>
                    <PrimaryFoodPhotoCard foodData={dayMenu.breakfast} />
                  </div>
                  <div css={rotateType(index).lunch}>
                    <PrimaryFoodPhotoCard foodData={dayMenu.lunch} />
                  </div>
                  <div css={rotateType(index).dinner}>
                    <PrimaryFoodPhotoCard foodData={dayMenu.dinner} />
                  </div>
                </div>
              </div>
            )
          )}
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
  margin: 0 auto 24px;
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
`;

const menu__title = css`
  width: 200px;
  margin: 0 auto 16px;
  @media screen and (max-width: 750px) {
    width: 160px;
  }
  @media screen and (max-width: 600px) {
    width: 120px;
    margin: 0 auto 8px;
  }
  @media screen and (max-width: 320px) {
    width: 100px;
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
  box-shadow: 0 0 1px 1px ${rgba('#000', 0.14)};
  @media screen and (max-width: 750px) {
    transform-origin: center 4px 0;
  }
  @media screen and (max-width: 600px) {
    transform-origin: center 2px 0;
  }
  &:hover {
    z-index: 2;
    box-shadow: 0 0 5px 1px ${rgba('#000', 0.14)};
  }
  &:hover a {
    &::before {
      left: 2%;
      box-shadow: 0 17px ${rgba('#000', 0.3)};
      @media screen and (max-width: 750px) {
        box-shadow: 0 16px ${rgba('#000', 0.3)};
      }
    }
  }
  &:hover a {
    &::after {
      right: 2%;
      box-shadow: 0 17px ${rgba('#000', 0.3)};
      @media screen and (max-width: 750px) {
        box-shadow: 0 16px ${rgba('#000', 0.3)};
      }
    }
  }
`;

const rotateOddType = {
  breakfast: css`
    ${foodContent}
    transform: rotate(-1deg);
    &:hover {
      transform: rotate(-1deg) translateY(-5px);
    }
  `,

  lunch: css`
    ${foodContent}
    z-index: 1;
    transform: rotate(-2deg);
    &:hover {
      transform: rotate(-2deg) translateY(-5px);
    }
  `,

  dinner: css`
    ${foodContent}
    transform: rotate(3deg);
    &:hover {
      transform: rotate(3deg) translateY(-5px);
    }
  `,
};

const rotateEvenType = {
  breakfast: css`
    ${foodContent}
    transform: rotate(-3deg);
    &:hover {
      transform: rotate(-3deg) translateY(-5px);
    }
  `,

  lunch: css`
    ${foodContent}
    z-index: 1;
    transform: rotate(2deg);
    &:hover {
      transform: rotate(2deg) translateY(-5px);
    }
  `,

  dinner: css`
    ${foodContent}
    transform: rotate(1deg);
    &:hover {
      transform: rotate(1deg) translateY(-5px);
    }
  `,
};
