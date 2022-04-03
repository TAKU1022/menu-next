import { useEffect, useState, VFC } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import { Container } from '../UIkit/Container';
import { DayMenuWithFood, MyMenuWithFood } from '@/types/typeMyMenu';
import { useUser } from 'src/hooks/useUser';
import { fetchMyMenuWithFood } from 'src/firebase/db/myMenu';
import { WoodBackground } from '../UIkit/WoodBackground';
import { Food } from '@/types/typeFood';

export const EditMyMenuPage: VFC = () => {
  const [myMenu, updateMyMenu] = useState<MyMenuWithFood | null>(null);
  const { user } = useUser();

  const dayTime = (index: number): { ja: string; en: string } | undefined => {
    if (index === 0) {
      return { ja: '朝', en: 'morning' };
    } else if (index === 1) {
      return { ja: '昼', en: 'noon' };
    } else if (index === 2) {
      return { ja: '夜', en: 'night' };
    }
  };

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
    <Container>
      <h2 css={title}>
        <img
          src="/images/titles/create-my-menu-title.png"
          alt="My献立編集"
          css={title__image}
        />
      </h2>
      <div css={root}>
        <WoodBackground>
          <div css={inner}>
            <div css={weekGrid}>
              {myMenu &&
                Object.values(myMenu).map(
                  (dayMenu: DayMenuWithFood, index: number) => (
                    <div key={dayMenu.dayOfWeek}>
                      <img
                        src={`/images/titles/day-of-week-title${index}.png`}
                        alt={`${dayMenu.dayOfWeek}曜日`}
                        css={dayOfWeek}
                      />
                      <div css={menuGrid}>
                        {Object.values({
                          breakfast: dayMenu.breakfast,
                          lunch: dayMenu.lunch,
                          dinner: dayMenu.dinner,
                        }).map((foodData: Food, index: number) => (
                          <button key={index} css={food}>
                            {[1, 2].map((number) => (
                              <img
                                src="/images/others/pin-blue.png"
                                alt="青色のピン"
                                key={number}
                                css={food__pin}
                              />
                            ))}
                            <div
                              style={{
                                backgroundImage: `url(${foodData.image})`,
                              }}
                              css={food__image}
                            >
                              <img
                                src={`/images/icons/${
                                  dayTime(index)?.en
                                }-icon.png`}
                                alt={`${dayTime(index)?.ja}のアイコン`}
                                css={food__timeIcon}
                              />
                            </div>
                            <p css={food__name}>{foodData.name}</p>
                            <div css={food__colorSheet}></div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </WoodBackground>
      </div>
    </Container>
  );
};

const title = css`
  margin: 0 auto 40px;
  @media screen and (max-width: 600px) {
    width: 90%;
    margin: 0 auto 32px;
  }
`;

const title__image = css`
  margin: 0 auto;
`;

const root = css`
  max-width: 1200px;
  margin: 0 auto;
`;

const inner = css`
  padding: 48px 24px 64px;
  @media screen and (max-width: 600px) {
    padding: 32px 16px 40px;
  }
`;

const weekGrid = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  @media screen and (max-width: 600px) {
    gap: 40px;
  }
`;

const dayOfWeek = css`
  width: 200px;
  margin: 0 auto 8px;
  @media screen and (max-width: 600px) {
    width: 120px;
    margin: 0 auto 4px;
  }
  @media screen and (max-width: 320px) {
    width: 100px;
  }
`;

const menuGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  @media screen and (max-width: 600px) {
    gap: 8px;
  }
`;

const food = css`
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  padding: 16px;
  background-color: #f0eddd;
  position: relative;
  box-shadow: 6px 6px 0 0 ${rgba('#000', 0.3)};
  @media screen and (max-width: 720px) {
    padding: 8px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px;
    box-shadow: 4px 4px 0 0 ${rgba('#000', 0.3)};
  }
`;

const food__pin = css`
  position: absolute;
  top: 8px;
  width: 16px;
  border-radius: 50%;
  box-shadow: 4px 4px 0 0 ${rgba('#000', 0.3)};
  z-index: 1;
  @media screen and (max-width: 720px) {
    top: 4px;
    width: 12px;
    box-shadow: 3px 3px 0 0 ${rgba('#000', 0.3)};
  }
  @media screen and (max-width: 600px) {
    top: 2px;
    width: 8px;
    box-shadow: 2px 2px 0 0 ${rgba('#000', 0.3)};
  }
  &:nth-of-type(1) {
    left: 8px;
    @media screen and (max-width: 720px) {
      left: 4px;
    }
    @media screen and (max-width: 600px) {
      left: 2px;
    }
  }
  &:nth-of-type(2) {
    right: 8px;
    @media screen and (max-width: 720px) {
      right: 4px;
    }
    @media screen and (max-width: 600px) {
      right: 2px;
    }
  }
`;

const food__image = css`
  background-size: cover;
  background-position: center;
  padding-bottom: 56.25%;
  border-radius: 4px;
  position: relative;
`;

const food__timeIcon = css`
  position: absolute;
  width: 20%;
  bottom: -3%;
  left: -1%;
  border-radius: 50%;
  box-shadow: 4px 4px 0 0 ${rgba('#000', 0.3)};
  @media screen and (max-width: 720px) {
    box-shadow: 3px 3px 0 0 ${rgba('#000', 0.3)};
  }
  @media screen and (max-width: 600px) {
    box-shadow: 2px 2px 0 0 ${rgba('#000', 0.3)};
  }
`;

const food__name = css`
  margin: 0;
  padding: 16px 0 0;
  color: #8a4d41;
  font-weight: bold;
  @media screen and (max-width: 720px) {
    padding: 8px 0 0;
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px 0 0;
    font-size: 12px;
  }
  @media screen and (max-width: 450px) {
    font-size: 10px;
  }
`;

const food__colorSheet = css`
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  opacity: 0;
  &:hover {
    opacity: 0.3;
  }
`;
