import { VFC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useUser } from 'src/hooks/useUser';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
} from '@chakra-ui/react';

export const CommonHeader: VFC = () => {
  const { userState } = useUser();

  return (
    <header css={header}>
      <div css={header__inner}>
        <div css={header__actionContent}>
          <button css={sideNavButton} aria-label="メニュー開閉">
            <img src="/images/icons/sidenav-toggle-icon.png" alt="" />
          </button>
          <Link href={'/'} passHref>
            <a css={mainLogo}>
              <img
                src="/images/logos/main-logo-shadow.png"
                alt="こんだての森"
              />
            </a>
          </Link>
        </div>
        <div css={header__linkContent}>
          <Link href={'/'} passHref>
            <a css={linkHome}>
              <img src="/images/icons/home-icon.png" alt="ホーム画面へ" />
            </a>
          </Link>
          <Link href={'/week_menu'} passHref>
            <a css={linkWeekMenu}>
              <img src="/images/icons/menu-icon.png" alt="一週間の献立画面へ" />
            </a>
          </Link>
          <Link href={'/food_list'} passHref>
            <a css={linkFoodList}>
              <img
                src="/images/icons/food-list-icon.png"
                alt="メニュー一覧画面へ"
              />
            </a>
          </Link>
          <Link href={'/post'} passHref>
            <a css={linkPost}>
              <img src="/images/icons/post-icon.png" alt="みんなの献立画面へ" />
            </a>
          </Link>
          <Link href={'/search'} passHref>
            <a css={linkSearch}>
              <img src="/images/icons/search-icon.png" alt="検索画面へ" />
            </a>
          </Link>
          <div css={userAvatarContent}>
            <Menu isLazy={true}>
              <MenuButton css={userAvatarButton}>
                {userState ? (
                  <img
                    css={userAvatar}
                    src={userState.avaterURL}
                    alt="ユーザーのアバター"
                  />
                ) : (
                  <SkeletonCircle size="10" isLoaded={!userState} />
                )}
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <img
                    css={menuIcon}
                    src="/images/icons/mypage-icon.png"
                    alt="マイページへ"
                  />
                  <span css={menuText}>マイページ</span>
                </MenuItem>
                <MenuItem>
                  <img
                    css={menuIconEdit}
                    src="/images/icons/edit-icon.png"
                    alt="My献立を編集画面へ"
                  />
                  <span css={menuText}>My献立を編集</span>
                </MenuItem>
                <MenuItem>
                  <img
                    css={menuIcon}
                    src="/images/icons/setting-icon.png"
                    alt="設定画面へ"
                  />
                  <span css={menuText}>設定</span>
                </MenuItem>
                <MenuItem>
                  <img
                    css={menuIcon}
                    src="/images/icons/logout-icon.png"
                    alt="設定画面へ"
                  />
                  <span css={menuText}>ログアウト</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

const header = css`
  width: 100%;
  background-image: url('/images/backgrounds/header-background.png');
  background-position: center top;
  background-repeat: no-repeat;
  background-size: auto 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const header__inner = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  @media screen and (max-width: 450px) {
    padding: 0 8px;
  }
`;

const header__actionContent = css`
  display: flex;
  width: 300px;
  margin: 32px 48px 0 0;
  @media screen and (max-width: 750px) {
    width: 250px;
    margin: 16px 32px 0 0;
  }
`;

const sideNavButton = css`
  flex-shrink: 0;
  width: 34px;
  margin: 0 16px 0 0;
  transform: rotate(3deg);
  @media screen and (min-width: 601px) {
    display: none;
  }
`;

const mainLogo = css`
  display: block;
  transform: rotate(-10deg);
  @media screen and (max-width: 750px) {
    transform: rotate(-4deg);
  }
`;

const header__linkContent = css`
  display: flex;
  margin: auto 0;
  justify-content: space-between;
  width: 440px;
  @media screen and (max-width: 750px) {
    width: 340px;
  }
  @media screen and (max-width: 600px) {
    width: 100px;
    justify-content: flex-end;
  }
  @media screen and (max-width: 320px) {
    width: 56px;
  }
`;

const linkHome = css`
  width: 40px;
  margin: 24px 0 0 0;
  transform: rotate(-6deg);
  @media screen and (max-width: 750px) {
    width: 34px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const linkWeekMenu = css`
  width: 40px;
  margin: 32px 0 0 0;
  transform: rotate(6deg);
  @media screen and (max-width: 750px) {
    width: 34px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const linkFoodList = css`
  width: 40px;
  margin: 24px 0 0 0;
  transform: rotate(-4deg);
  @media screen and (max-width: 750px) {
    width: 34px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const linkPost = css`
  width: 40px;
  margin: 32px 0 0 0;
  transform: rotate(4deg);
  @media screen and (max-width: 750px) {
    width: 34px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const linkSearch = css`
  width: 40px;
  margin: 24px 0 0 0;
  transform: rotate(-4deg);
  @media screen and (max-width: 750px) {
    width: 34px;
  }
  @media screen and (max-width: 600px) {
    margin: 32px 16px 0 0;
  }
  @media screen and (max-width: 320px) {
    display: none;
  }
`;

const userAvatarContent = css`
  background-image: url('/images/icons/user-avater-icon.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 24px 0 0 -8px;
  width: 52px;
  height: 55px;
  position: relative;
  border-radius: 50%;
  box-shadow: 3px 2px 0 0 rgba(black, 0.3);
  @media screen and (max-width: 750px) {
    width: 42px;
    height: 44px;
    margin: 16px 0 0 0;
  }
`;

const userAvatarButton = css`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -49%);
  @media screen and (max-width: 750px) {
    width: 30px;
    height: 30px;
  }
`;

const userAvatar = css`
  display: block;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 0 -2px 0 0 #6a380b;
`;

const menuIcon = css`
  width: 20px;
  margin-right: 16px;
  display: inline-block;
  vertical-align: middle;
`;

const menuIconEdit = css`
  width: 22px;
  margin-right: 14px;
  display: inline-block;
  vertical-align: middle;
`;

const menuText = css`
  font-family: 'M PLUS Rounded 1c', Roboto, 'Helvetica Neue', sans-serif;
  color: #612000;
`;
