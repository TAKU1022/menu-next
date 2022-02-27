import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme, Progress } from '@chakra-ui/react';
import { UserProvider } from '../components/context/user/UserProvider';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoadingPage, updateIsLoadingPage] = useState<boolean>(false);

  const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          height: '100%',
          fontFamily:
            "'M PLUS Rounded 1c', Roboto, 'Helvetica Neue', sans-serif",
        },
        li: {
          listStyle: 'none',
        },
      },
    },
  });

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.asPath && updateIsLoadingPage(true);
    };
    const handleComplete = () => {
      updateIsLoadingPage(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        {isLoadingPage && (
          <Progress
            size="xs"
            colorScheme="messenger"
            isIndeterminate
            width={'100%'}
            backgroundColor="transparent"
            position="fixed"
            top={0}
            zIndex={999}
          />
        )}
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
