import { ReactNode, VFC } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import { IconType } from 'react-icons';

type Props = {
  children: ReactNode;
  Icon?: IconType;
};

export const PrimaryButton: VFC<Props> = ({ children, Icon }) => {
  return (
    <button css={button}>
      <span css={button__border}>
        {Icon && <Icon css={button__icon} />}
        <span css={button__text}>{children}</span>
      </span>
    </button>
  );
};

const button = css`
  background-color: #8a4d41;
  padding: 5px;
  border-radius: 30px;
  box-shadow: 4px 4px 0 0 ${rgba('#000', 0.3)};
  display: block;
  width: fit-content;
  cursor: pointer;
  &:hover {
    background-color: #eb7819;
  }
`;

const button__border = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #eeeeee;
  padding: 8px 40px;
  border-radius: 30px;
  font-size: 24px;
  @media screen and (max-width: 660px) {
    padding: 8px 32px;
    font-size: 20px;
  }
`;

const button__icon = css`
  color: #fff050;
  margin: 0 16px 0 0;
  @media screen and (max-width: 660px) {
    margin: 0 8px 0 0;
  }
`;

const button__text = css`
  display: block;
  font-weight: bold;
  color: #fff050;
  letter-spacing: 2px;
  border-radius: 20px;
  font-size: 18px;
  @media screen and (max-width: 720px) {
    font-size: 14px;
  }
`;
