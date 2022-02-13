import { ReactNode, VFC } from 'react';
import { css } from '@emotion/react';

type Props = {
  children: ReactNode;
};

export const Container: VFC<Props> = ({ children }) => {
  return <div css={container}>{children}</div>;
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
