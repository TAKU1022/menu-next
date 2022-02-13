import { VFC } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import { FoodCard } from '@/types/typeFood';
import Link from 'next/link';

type Props = {
  foodCard: FoodCard;
};

export const FoodPhotoCard: VFC<Props> = ({ foodCard }) => {
  const rotateId: keyof typeof rootType = foodCard.rotateType.rotateId;

  return (
    <div css={rootType[rotateId]}>
      <Link href={`/food_list/${foodCard.data.foodId}`}>
        <a css={food}>
          <img css={food__pin} src={'/images/others/pin-red.png'} alt="" />
          <div
            css={food__image}
            style={{ backgroundImage: `url(${foodCard.data.image})` }}
          ></div>
          <p css={food__name}>{foodCard.data.name}</p>
        </a>
      </Link>
    </div>
  );
};

const root = css`
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

const rootType = {
  a: css`
    ${root}
    transform: rotate(-2deg);
    &:hover {
      transform: rotate(-2deg) translateY(-5px);
    }
  `,

  b: css`
    ${root}
    transform: rotate(-3deg);
    &:hover {
      transform: rotate(-3deg) translateY(-5px);
    }
  `,

  c: css`
    ${root}
    transform: rotate(-4deg);
    &:hover {
      transform: rotate(-4deg) translateY(-5px);
    }
  `,

  d: css`
    ${root}
    transform: rotate(2deg);
    &:hover {
      transform: rotate(2deg) translateY(-5px);
    }
  `,

  e: css`
    ${root}
    transform: rotate(3deg);
    &:hover {
      transform: rotate(3deg) translateY(-5px);
    }
  `,

  f: css`
    ${root}
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
