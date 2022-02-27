import { ReactNode, VFC } from 'react';
import { AuthGuard } from '../functional/AuthGuard';
import { css } from '@emotion/react';
import { CommonFooter } from '../UIkit/CommonFooter';
import { CommonHeader } from '../UIkit/CommonHeader';

type Props = {
  children: ReactNode;
};

export const CommonLayout: VFC<Props> = ({ children }) => {
  return (
    <AuthGuard>
      <div css={wrapper}>
        <CommonHeader />
        <main css={main}>{children}</main>
        <CommonFooter />
      </div>
    </AuthGuard>
  );
};

const wrapper = css`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  background-image: url('/images/backgrounds/green-background.png');
  overflow: hidden;
`;

const main = css`
  flex: 1;
`;
