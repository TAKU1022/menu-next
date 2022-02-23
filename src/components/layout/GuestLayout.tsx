import { ReactNode, VFC } from 'react';
import { css } from '@emotion/react';
import { GuestGuard } from '../functional/GuestGuard';
import { CommonFooter } from '../UIkit/CommonFooter';

type Props = {
  children: ReactNode;
};

export const GuestLayout: VFC<Props> = ({ children }) => {
  return (
    <GuestGuard>
      <div css={wrapper}>
        <main>{children}</main>
        <CommonFooter />
      </div>
    </GuestGuard>
  );
};

const wrapper = css`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  background-image: url('/images/backgrounds/green-background.png');
`;

const main = css`
  flex: 1;
`;
