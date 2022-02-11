import { VFC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';

export const CommonFooter: VFC = () => {
  return (
    <footer css={footer}>
      <div css={footer__inner}>
        <ul css={list}>
          <li css={list__item}>
            <Link href={'/terms'}>
              <a css={list__link}>利用規約</a>
            </Link>
          </li>
          <li css={list__item}>
            <Link href={'/privacy'}>
              <a css={list__link}>プライバシーポリシー</a>
            </Link>
          </li>
          <li css={list__item}>
            <a
              css={list__link}
              href="https://twitter.com/TAKU26499971"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              お問い合わせ
            </a>
          </li>
        </ul>
        <p css={corporate}>
          <small css={corporate__copy}>&copy; 2020 こんだての森</small>
        </p>
      </div>
    </footer>
  );
};

const footer = css`
  color: #fff;
  background-color: #755732;
  padding: 24px 32px;
`;

const footer__inner = css`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 880px;
  @media screen and (max-width: 450px) {
    flex-flow: column;
  }
`;

const list = css`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 450px) {
    margin: 0 auto 16px;
  }
`;

const list__item = css`
  font-size: 12px;
  @media screen and (max-width: 450px) {
    font-size: 10px;
  }
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const list__link = css`
  color: #fff;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const corporate = css`
  margin: 0;
  font-size: 12px;
  @media screen and (max-width: 450px) {
    margin: 0 auto;
    font-size: 10px;
  }
`;

const corporate__copy = css`
  font-size: inherit;
`;
