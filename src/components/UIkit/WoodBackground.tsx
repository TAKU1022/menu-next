import { ReactNode, VFC } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';

type Props = {
  children: ReactNode;
};

export const WoodBackground: VFC<Props> = ({ children }) => {
  return (
    <div css={woodBackground}>
      {[1, 2, 3, 4].map((number) => (
        <img
          css={woodPins}
          src="/images/others/wood-pin.png"
          alt=""
          key={number}
        />
      ))}
      {children}
    </div>
  );
};

const woodBackground = css`
  background: url('/images/backgrounds/wood-background0.png');
  border-radius: 4px;
  z-index: 0;
  position: relative;
`;

const woodPins = css`
  position: absolute;
  width: 40px;
  border-radius: 50%;
  box-shadow: 3px 3px 0 0 ${rgba('#000', 0.3)};
  @media screen and (max-width: 600px) {
    width: 32px;
  }
  &:nth-of-type(1) {
    top: 8px;
    left: 8px;
  }
  &:nth-of-type(2) {
    top: 8px;
    right: 8px;
  }
  &:nth-of-type(3) {
    bottom: 8px;
    left: 8px;
  }
  &:nth-of-type(4) {
    bottom: 8px;
    right: 8px;
  }
`;
