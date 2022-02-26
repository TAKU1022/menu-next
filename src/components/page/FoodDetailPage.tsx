import { VFC } from 'react';
import useSWR from 'swr';
import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import { fetcher } from 'src/util/fetcher';
import { Food } from '@/types/typeFood';
import { Container } from '../UIkit/Container';
import { WoodBackground } from '../UIkit/WoodBackground';
import { Recipe, RecipeRanking } from '@/types/typeRecipeRanking';

type Props = {
  food: Food;
};

export const FoodDetailPage: VFC<Props> = ({ food }) => {
  const { data, error } = useSWR<RecipeRanking>(
    `/api/recipeRanking/${food.categoryId}`,
    fetcher
  );

  return (
    <Container>
      <div css={root}>
        <WoodBackground>
          <div css={inner}>
            <h1 css={foodName}>
              <span css={foodName__text}>{food.name}のレシピ</span>
            </h1>
            {data && (
              <div css={grid}>
                {data.result.map((recipeData: Recipe) => (
                  <div key={recipeData.recipeId} css={recipe}>
                    {[1, 2].map((number) => (
                      <img
                        src="/images/others/pin-yellow.png"
                        alt="黄色のピン"
                        key={number}
                        css={recipe__pin}
                      />
                    ))}
                    <div
                      style={{
                        backgroundImage: `url(${recipeData.foodImageUrl})`,
                      }}
                      css={recipe__image}
                    ></div>
                    <div css={recipe__about}>
                      <p css={recipe__title}>{recipeData.recipeTitle}</p>
                      <p css={recipe__material}>
                        材料：{recipeData.recipeMaterial}
                      </p>
                      <p>
                        <span css={recipe__indication}>
                          調理時間：{recipeData.recipeIndication}
                        </span>
                        <span css={recipe__cost}>
                          費用：{recipeData.recipeCost}
                        </span>
                      </p>
                      <p css={recipe__url}>
                        <span>作り方：</span>
                        <a
                          href={recipeData.recipeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          css={recipe__link}
                        >
                          {recipeData.recipeUrl}
                        </a>
                      </p>
                    </div>
                    <p css={recipe__logoContent}>
                      <span css={recipe__logoText}>by</span>
                      <a
                        href="https://recipe.rakuten.co.jp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        css={recipe__logoLink}
                      >
                        <img
                          src="/images/others/rakuten-recipe.png"
                          alt="楽天レシピ"
                          css={recipe__logo}
                        />
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </WoodBackground>
      </div>
    </Container>
  );
};

const root = css`
  max-width: 1000px;
  margin: 0 auto;
`;

const inner = css`
  padding: 48px 24px 56px;
  @media screen and (max-width: 450px) {
    padding: 40px 16px 48px;
  }
`;

const foodName = css`
  box-sizing: border-box;
  margin: 0 auto 48px;
  position: relative;
  vertical-align: middle;
  width: 320px;
  z-index: 0;
  box-shadow: 0 3px 0 0 ${rgba('#000', 0.3)};
  @media screen and (max-width: 600px) {
    width: 260px;
  }
  &::before,
  &::after {
    border-color: #ffa000;
    border-style: solid;
    bottom: -10px;
    content: '';
    position: absolute;
    width: 0;
    z-index: -1;
    box-shadow: 0 3px 0 0 ${rgba('#000', 0.3)};
  }
  &::before {
    border-left-color: transparent;
    border-width: 25px 20px 25px 20px;
    left: -30px;
    @media screen and (max-width: 600px) {
      border-width: 20px 15px 20px 15px;
      left: -20px;
    }
  }
  &::after {
    border-right-color: transparent;
    border-width: 25px 20px 25px 20px;
    right: -30px;
    @media screen and (max-width: 600px) {
      border-width: 20px 15px 20px 15px;
      right: -20px;
    }
  }
`;

const foodName__text = css`
  display: block;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  background: #ffb300;
  color: #fff;
  padding: 12px 20px;
  position: relative;
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
  &::before,
  &::after {
    border: none;
    border-bottom: solid 10px transparent;
    content: '';
    position: absolute;
    top: 100%;
  }
  &::before {
    left: 0;
    border-right: solid 10px #ef6c00;
  }
  &::after {
    right: 0;
    border-left: solid 10px #ef6c00;
  }
`;

const grid = css`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 56px;
  max-width: 620px;
  margin: 0 auto;
`;

const recipe = css`
  background-color: #f0eddd;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 6px 6px 0 0 ${rgba('#000', 0.3)};
  position: relative;
  @media screen and (max-width: 320px) {
    padding: 8px;
  }
`;

const recipe__pin = css`
  position: absolute;
  top: 8px;
  width: 20px;
  border-radius: 50%;
  box-shadow: 4px 4px 0 0 ${rgba('#000', 0.3)};
  @media screen and (max-width: 720px) {
    box-shadow: 3px 3px 0 0 ${rgba('#000', 0.3)};
  }
  @media screen and (max-width: 600px) {
    box-shadow: 2px 2px 0 0 ${rgba('#000', 0.3)};
  }
  @media screen and (max-width: 320px) {
    top: 4px;
    width: 18px;
  }
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

const recipe__image = css`
  background-size: cover;
  background-position: center;
  padding-bottom: 56.25%;
  border-radius: 5px;
`;

const recipe__about = css`
  padding: 16px;
  text-align: left;
  font-weight: bold;
  @media screen and (max-width: 320px) {
    padding: 8px;
  }
`;

const recipe__title = css`
  color: #8a4d41;
  font-size: 18px;
  margin: 0 0 16px;
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
  @media screen and (max-width: 320px) {
    font-size: 14px;
  }
`;

const recipe__material = css`
  color: ${rgba('#8a4d41', 0.8)};
  margin: 0 0 16px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
  @media screen and (max-width: 320px) {
    font-size: 12px;
  }
`;

const recipe__indication = css`
  color: ${rgba('#8a4d41', 0.8)};
  margin-right: 16px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
  @media screen and (max-width: 320px) {
    font-size: 12px;
  }
`;

const recipe__cost = css`
  color: ${rgba('#8a4d41', 0.8)};
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
  @media screen and (max-width: 320px) {
    font-size: 12px;
  }
`;

const recipe__url = css`
  word-break: break-all;
  color: ${rgba('#8a4d41', 0.8)};
  margin: 16px 0 0;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
  @media screen and (max-width: 320px) {
    font-size: 12px;
  }
`;

const recipe__link = css`
  &:hover {
    text-decoration: underline;
  }
`;

const recipe__logoContent = css`
  display: flex;
  justify-content: flex-end;
`;

const recipe__logoText = css`
  color: ${rgba('#8a4d41', 0.8)};
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
  @media screen and (max-width: 320px) {
    font-size: 12px;
  }
`;

const recipe__logoLink = css`
  width: 140px;
  @media screen and (max-width: 600px) {
    width: 120px;
  }
  @media screen and (max-width: 320px) {
    width: 100px;
  }
  &:hover {
    opacity: 0.6;
  }
`;

const recipe__logo = css`
  vertical-align: middle;
`;
