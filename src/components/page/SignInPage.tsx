import { VFC } from 'react';
import { css } from '@emotion/react';
import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from 'src/hooks/useAuth';

export const SignInPage: VFC = () => {
  const { signInWithGoogle } = useAuth();

  const onClickSignInButton = () => {
    signInWithGoogle();
  };

  return (
    <div css={dotBackground}>
      <div css={mv}>
        <div css={mv__vegetablesBackground}>
          <img
            src="/images/logos/main-logo-welcome.png"
            alt="こんだての森"
            css={mv__logo}
          />
        </div>
      </div>
      <div css={content}>
        <h2 css={content__title}>
          まいにちがとくべつ！
          <br />
          アカウントを作成して、自分だけのこんだて作り！
        </h2>
        <img
          src="/images/others/welcome-line.png"
          alt="ライン画像"
          css={content__lineImage}
        />
        <div css={content__body}>
          <img
            src="/images/others/welcome-today.png"
            alt="本日の献立画面"
            css={content__image}
          />
          <div css={content__sentenceGroup}>
            <p css={content__sentence}>
              ログインすると一週間のこんだてが作成され、 <br />
              曜日ごとにそれぞれ, <br />
              朝、昼、晩の三食のメニューが提案されます。
            </p>
            <p css={content__sentence}>
              作成されたこんだては編集できるので、 <br />
              たくさんの大好物や、 <br />
              ダイエットのためのヘルシーなメニューや、
              <br />
              苦手な食べ物の克服など、
              <br />
              あなたのこだわりがたっぷりつまった、
              <br />
              世界で一つだけのこんだてを作りあげましょう。
            </p>
          </div>
          <img
            src="/images/others/welcome-week.png"
            alt="一週間の献立画面"
            css={content__image}
          />
        </div>
        <Button
          leftIcon={<FcGoogle size={18} />}
          boxShadow="md"
          bgColor="white"
          color="blackAlpha.700"
          fontFamily="Roboto"
          fontSize={14}
          px={8}
          py={6}
          onClick={onClickSignInButton}
        >
          Googleでログイン
        </Button>
      </div>
    </div>
  );
};

const dotBackground = css`
  text-align: center;
  overflow: hidden;
  background: url('/images/backgrounds/dot-background.jpg');
  background-position: center;
  @media screen and (max-width: 600px) {
    background-size: 20px 20px;
  }
`;

const mv = css`
  background-image: url('/images/backgrounds/welcome-header-background.png');
  background-size: 120px 120px;
  background-position: 30px 30px;
  margin-bottom: 88px;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    margin-bottom: 48px;
  }
`;

const mv__vegetablesBackground = css`
  background-image: url('/images/backgrounds/vegetables-background.png');
  background-position: center;
  background-size: 110% auto;
  width: 100%;
  height: 100vh;
  position: relative;
  @media screen and (max-width: 800px) {
    height: 0;
    padding-bottom: 56.25%;
  }
`;

const mv__logo = css`
  position: absolute;
  width: 60%;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);
  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

const content = css`
  color: #8a4d41;
  margin: 0 auto;
  max-width: 1600px;
  padding: 0 16px 104px;
  @media screen and (max-width: 600px) {
    padding: 0 16px 64px;
  }
`;

const content__title = css`
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 24px;
  @media screen and (max-width: 1000px) {
    font-size: 26px;
  }
  @media screen and (max-width: 600px) {
    font-size: 22px;
  }
  @media screen and (max-width: 320px) {
    font-size: 20px;
  }
`;

const content__lineImage = css`
  margin: 0 auto 24px;
`;

const content__body = css`
  margin-bottom: 48px;
  display: flex;
  @media screen and (max-width: 1000px) {
    flex-flow: column;
  }
`;

const content__sentenceGroup = css`
  flex: 1;
  margin: 24px 0;
`;

const content__sentence = css`
  font-size: 20px;
  margin: 0 0 32px;
  font-weight: bold;
  @media screen and (max-width: 1100px) {
    font-size: 18px;
  }
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
  @media screen and (max-width: 450px) {
    font-size: 15px;
  }
  @media screen and (max-width: 320px) {
    font-size: 13px;
  }

  &:nth-last-child(1) {
    margin: 0;
  }
`;

const content__image = css`
  width: 30%;
  align-self: center;
  @media screen and (max-width: 1000px) {
    width: auto;
  }
  @media screen and (max-width: 400px) {
    width: 80%;
  }
`;
